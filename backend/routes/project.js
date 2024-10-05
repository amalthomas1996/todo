
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// POST /api/projects
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const newProject = new Project({ title, todos: [] });
    await newProject.save();
    res.status(201).json({ project: newProject });
  } catch (error) {
    console.error('Error creating project', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
});
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});
router.get('/:id', getProjectById);


module.exports = router;
