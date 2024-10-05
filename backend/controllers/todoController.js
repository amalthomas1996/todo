
const Todo = require('../models/Todo');

// Add a new todo
exports.addTodo = async (req, res) => {
  const { projectId, description } = req.body;

  try {
    const newTodo = new Todo({
      projectId,
      description,
    });

    await newTodo.save();
    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Mark todo as completed
exports.completeTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.status = 'completed';
    todo.updatedDate = new Date();
    await todo.save();

    res.status(200).json({ message: 'Todo marked as completed', todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get todos for a project
exports.getProjectTodos = async (req, res) => {
  const { projectId } = req.params;

  try {
    const todos = await Todo.find({ projectId });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
