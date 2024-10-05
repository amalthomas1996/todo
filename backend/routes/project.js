const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById } = require('../controllers/projectController');

// POST /api/projects
router.post('/', createProject);

// GET /api/projects
router.get('/', getProjects);

// GET /api/projects/:id
router.get('/:id', getProjectById);

module.exports = router;
