const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(courses);
  } catch (error) {
    console.error(error); // helpful for debugging
    res.status(500).json({ error: error.message });
  }
});

// GET single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// POST new course
router.post('/', async (req, res) => {
  try {
    const { title, description, instructor, videourl } = req.body;
    if (!title || !description || !instructor || !videourl) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const course = await Course.create({ title, description, instructor, videourl });
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE course by ID
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    await course.destroy();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
