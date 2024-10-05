const Project = require('../models/Project'); // Ensure correct casing
const Todo = require('../models/Todo');

// Add a new todo to a project
exports.addTodo = async (req, res) => {
  const { projectId, description } = req.body;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Create a new todo and push it to the project
    const newTodo = { description, status: 'pending' };
    project.todos.push(newTodo);

    // Save the updated project with the new todo
    await project.save();

    // Return the newly created todo
    res.status(201).json({ todo: newTodo });
  } catch (error) {
    console.error('Error adding todo', error);
    res.status(500).json({ message: 'Failed to add todo' });
  }
};

// Toggle a todo's status between "complete" and "pending"
exports.toggleTodoStatus = async (req, res) => {
  const { todoId } = req.params;

  try {
    const project = await Project.findOne({ "todos._id": todoId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const todo = project.todos.id(todoId);
    if (todo) {
      todo.status = todo.status === 'complete' ? 'pending' : 'complete';
      await project.save();
      res.status(200).json({ todo });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error toggling todo status', error);
    res.status(500).json({ message: 'Failed to toggle todo status' });
  }
};

// Edit a todo's description
exports.editTodo = async (req, res) => {
  const { todoId } = req.params;
  const { description } = req.body;

  try {
    // Find the project containing this todo
    const project = await Project.findOne({ "todos._id": todoId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Find the specific todo within the project
    const todo = project.todos.id(todoId);
    if (todo) {
      // Update the todo's description
      todo.description = description;
      await project.save();
      res.status(200).json({ todo });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error editing todo', error);
    res.status(500).json({ message: 'Failed to edit todo' });
  }
};

// Get all todos for a project
exports.getProjectTodos = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Find the project by its ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Return all todos for the project
    res.status(200).json(project.todos);
  } catch (error) {
    console.error('Error fetching todos', error);
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

// Delete a todo from a project
exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    // Find the project containing the todo
    const project = await Project.findOne({ "todos._id": todoId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Remove the todo from the project's todos array
    const todo = project.todos.id(todoId);
    if (todo) {
      todo.remove(); // Mongoose provides a .remove() method for subdocuments
      await project.save();
      res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error deleting todo', error);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};
