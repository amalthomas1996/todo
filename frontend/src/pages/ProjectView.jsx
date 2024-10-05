import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProjectView = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  // Fetch the project and its todos
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/projects/${id}`
        );
        setProject(response.data);
      } catch (err) {
        console.error("Failed to fetch project", err);
        setError("Failed to fetch project");
      }
    };

    fetchProject();
  }, [id]);

  // Handle adding a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/todo/add`, {
        projectId: id,
        description: newTodo,
      });

      // Update the project state with the new todo
      setProject((prev) => ({
        ...prev,
        todos: [...prev.todos, response.data.todo],
      }));

      setNewTodo("");
      setAlert({ message: "Todo added successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to add todo", err);
      setAlert({ message: "Failed to add todo", type: "error" });
    }
  };

  // Handle toggling a todo's status between "complete" and "pending"
  const handleToggleTodoStatus = async (todoId) => {
    try {
      const updatedTodo = await axios.put(
        `http://localhost:5000/api/todo/toggle-status/${todoId}`
      );

      // Update the project state to reflect the new status
      setProject((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) =>
          todo._id === todoId ? updatedTodo.data.todo : todo
        ),
      }));

      setAlert({ message: "Todo status updated!", type: "success" });
    } catch (err) {
      console.error("Failed to update todo status", err);
      setAlert({ message: "Failed to update todo status", type: "error" });
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${todoId}`);
      setProject((prev) => ({
        ...prev,
        todos: prev.todos.filter((todo) => todo._id !== todoId),
      }));
      setAlert({ message: "Todo deleted successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to delete todo", err);
      setAlert({ message: "Failed to delete todo", type: "error" });
    }
  };

  // Handle editing a todo description
  const handleEditTodo = (todoId, description) => {
    setEditingTodo(todoId);
    setEditDescription(description);
  };

  // Handle saving the updated todo description
  const handleSaveTodo = async (todoId) => {
    try {
      const updatedTodo = await axios.put(
        `http://localhost:5000/api/todo/edit/${todoId}`,
        { description: editDescription }
      );

      setProject((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) =>
          todo._id === todoId ? updatedTodo.data.todo : todo
        ),
      }));

      setEditingTodo(null);
      setAlert({ message: "Todo updated successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to update todo", err);
      setAlert({ message: "Failed to update todo", type: "error" });
    }
  };

  // Display error or loading state
  if (error) return <p className="text-red-500">{error}</p>;
  if (!project) return <p>Loading...</p>; // Show loading while fetching data

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

      {alert.message && (
        <div
          className={`alert ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } p-4 rounded mb-4`}
        >
          {alert.message}
        </div>
      )}

      <h2 className="text-lg mt-4">Todos:</h2>
      <div className="space-y-4">
        {project.todos && project.todos.length > 0 ? (
          project.todos.map((todo) => (
            <div
              key={todo._id}
              className="border p-4 rounded shadow-md bg-white flex justify-between items-center"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.status === "complete"}
                  onChange={() => handleToggleTodoStatus(todo._id)}
                  className="mr-2"
                />
                {editingTodo === todo._id ? (
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border-b focus:outline-none"
                  />
                ) : (
                  <span
                    className={`flex-grow ${
                      todo.status === "complete"
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {todo.description}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {editingTodo === todo._id ? (
                  <button
                    onClick={() => handleSaveTodo(todo._id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTodo(todo._id, todo.description)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </div>

      <form onSubmit={handleAddTodo} className="mt-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 ml-2"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default ProjectView;
