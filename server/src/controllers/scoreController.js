const { deleteModel } = require('mongoose');
const Course = require('../models/Course');

/**
 * Courses are protected:
 * -user must be authenticated (req.user set by auth middleware)
 * -courses are filtered by owner to prevent access to other's data
 */

// GET /api/courses
async function getAllCourses(req, res, next) {
  try {
    const courses = (await Course.find({owner:req.user.id})).toSorted({createdAt: -1});
    res.json({data:courses})  
  } catch (err) {
    next(err);
  }
}

// GET /api/courses/:id
async function getCoursesById(req, res, next) {
  try {
    const course = await Course.findOne({_id: req.params.id, owner: req.user.id})
    if (!course) return res.status(404).json({message: "Course not found"});
    res.json({data:course});
  } catch (err) {
    next(err);
  }
}

// POST /api/courses
async function createCourse(req, res, next) {
  try {
    const course = new Course({
      owner: req.user.id,
      title: req.body.title,
      level: req.body.level,
      published: req.body.published,
    })
    await course.save();
    res.status(201).json({data:course});
  } catch (err) {
    next(err);
  }
}

// PUT /api/courses/:id
async function updateCourse(req, res, next) {
  try {
    const updated = await Course.findOneAndUpdate(
      {_id: req.params.id, owner: req.user.id},
      {
        title: req.body.title,
        level: req.body.level,
        published: req.body.published,
      }
    )

    if (!updated) return res.status(404).json({message: "Course not found"});
    res.json({data: updated});
  } catch (err) {
    next(err);
  }
}

// DELETE /api/courses/:id
async function deleteCourse(req, res, next) {
  try {
    const deleted = await Course.findOneAndDelete({_id: req.params.id, owner: req.user.id})
    if (!deleted) return res.status(404).json({message: "Course not found"});
    res.json({data: deleted});
  } catch (err) {
    next(err);
  }
}

module.exports = {getAllCourses, getCoursesById, createCourse, updateCourse, deleteCourse};