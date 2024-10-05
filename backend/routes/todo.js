const express = require('express');
const {
  addTodo,
  toggleTodoStatus,  // Ensure correct naming
  editTodo,           // Ensure correct naming
  getProjectById,
  deleteTodo
} = require('../controllers/todoController');  // Make sure the path is correct

const router = express.Router();

// Add a new todo
router.post('/add', addTodo);

// Toggle the status of a todo (complete or pending)
router.put('/toggle-status/:todoId', toggleTodoStatus);  // Correctly reference the function

// Edit a todo's description
router.put('/edit/:todoId', editTodo);  // Correctly reference the function

// Get all todos for a specific project
router.get('/:id', getProjectById);

// Delete a todo
router.delete('/:todoId', deleteTodo);

module.exports = router;
