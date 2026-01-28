const Score = require('../models/Score');

/**
 * Scores are protected:
 * - user must be authenticated (req.user set by auth middleware)
 * - scores are filtered by owner to prevent access to other's data
 */

// GET /api/scores
async function getAllScores(req, res, next) {
  try {
    const scores = await Score.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json({ data: scores });
  } catch (err) {
    next(err);
  }
}

// GET /api/scores/:id
async function getScoresById(req, res, next) {
  try {
    const score = await Score.findOne({ _id: req.params.id, owner: req.user.id });
    if (!score) return res.status(404).json({ message: "Score not found" });
    res.json({ data: score });
  } catch (err) {
    next(err);
  }
}

// POST /api/scores
async function createScore(req, res, next) {
  try {
    const score = new Score({
      owner: req.user.id,
      title: req.body.title,
      level: req.body.level,
      published: req.body.published,
    });
    await score.save();
    res.status(201).json({ data: score });
  } catch (err) {
    next(err);
  }
}

// PUT /api/scores/:id
async function updateScore(req, res, next) {
  try {
    const updated = await Score.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      {
        title: req.body.title,
        level: req.body.level,
        published: req.body.published,
      },
      { new: true } // Return the updated document
    );

    if (!updated) return res.status(404).json({ message: "Score not found" });
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/scores/:id
async function deleteScore(req, res, next) {
  try {
    const deleted = await Score.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Score not found" });
    res.json({ data: deleted });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllScores, getScoresById, createScore, updateScore, deleteScore };