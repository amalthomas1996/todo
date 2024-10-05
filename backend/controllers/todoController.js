// Path: backend/controllers/todoController.js
const Todo = require('../models/Todo');

exports.addTodo = async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      completed: false,
      projectId: req.body.projectId
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add todo' });
  }
};
