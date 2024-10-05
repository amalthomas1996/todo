const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  const { name } = req.body;

  try {
    const project = await Project.create({
      name,
      user: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all projects for the logged-in user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
