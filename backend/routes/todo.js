const express = require('express');
const {
  addTodo,
  toggleTodoStatus,
  editTodo,
  getProjectTodos,  // Ensure this matches the export name
  deleteTodo
} = require('../controllers/todoController');  // Ensure this path is correct

const router = express.Router();

// Add a new todo
router.post('/add', addTodo);

// Toggle the status of a todo (complete or pending)
router.put('/toggle-status/:todoId', toggleTodoStatus);

// Edit a todo's description
router.put('/edit/:todoId', editTodo);

// Get all todos for a specific project
router.get('/:projectId', getProjectTodos); // Correctly refer to the function here

// Delete a todo
router.delete('/:todoId', deleteTodo);

module.exports = router;
