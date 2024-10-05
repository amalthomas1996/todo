// Path: frontend/src/components/ProjectView.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProjectView = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  // Fetch project details and todos
  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect if not authenticated
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/projects/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProject(response.data);
      } catch (err) {
        console.error("Failed to fetch project", err);
        setError("Failed to fetch project");
      }
    };

    fetchProject();
  }, [id, navigate]);

  // Add a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return setError("You must be logged in to add todos");

    if (!newTodo) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/todo/add",
        {
          projectId: id,
          description: newTodo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

  // Toggle todo status (complete/incomplete)
  const handleToggleTodoStatus = async (todoId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/todo/toggle-status/${todoId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProject((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) =>
          todo._id === todoId ? response.data.todo : todo
        ),
      }));
      setAlert({ message: "Todo status updated!", type: "success" });
    } catch (err) {
      console.error("Failed to update todo status", err);
      setAlert({ message: "Failed to update todo status", type: "error" });
    }
  };

  // Delete todo
  const handleDeleteTodo = async (todoId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/api/todo/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  // Edit todo
  const handleEditTodo = (todoId, description) => {
    setEditingTodo(todoId);
    setEditDescription(description);
  };

  // Save edited todo
  const handleSaveTodo = async (todoId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/todo/edit/${todoId}`,
        {
          description: editDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProject((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) =>
          todo._id === todoId ? response.data.todo : todo
        ),
      }));
      setEditingTodo(null);
      setAlert({ message: "Todo updated successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to update todo", err);
      setAlert({ message: "Failed to update todo", type: "error" });
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!project) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

      {alert.message && (
        <div
          className={`p-4 rounded mb-4 ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      <h2 className="text-lg mt-4">Todos:</h2>
      <div className="space-y-4">
        {project.todos.length > 0 ? (
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
              <div className="flex items-center">
                {editingTodo === todo._id ? (
                  <>
                    <button
                      onClick={() => handleSaveTodo(todo._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTodo(null)}
                      className="ml-2 text-red-500 hover:text-red-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditTodo(todo._id, todo.description)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="ml-2 text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No todos available</p>
        )}
      </div>

      <form onSubmit={handleAddTodo} className="mt-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-2 hover:bg-blue-600"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default ProjectView;
