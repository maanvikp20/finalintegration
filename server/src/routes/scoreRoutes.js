const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/authMiddleware");
const { getAllScores, getScoresById, createScore, updateScore, deleteScore } = require("../controllers/scoreController");

/**
 * We are going to apply the requireAuth to all score routes:
 * --> Every request must include a valid JWT token
 */
router.use(requireAuth);

router.get("/", getAllScores);
router.get("/:id", getScoresById);
router.post("/", createScore);
router.put("/:id", updateScore);
router.delete("/:id", deleteScore);

module.exports = router;