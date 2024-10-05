
const express = require('express');
const { addTodo, completeTodo, getProjectTodos } = require('../controllers/todoController');
const router = express.Router();

router.post('/add', addTodo);
router.put('/complete/:todoId', completeTodo);
router.get('/:projectId', getProjectTodos);

module.exports = router;
