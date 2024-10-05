// Path: frontend/src/components/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // For navigation after login

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        });
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setError("Failed to fetch projects");
      }
    };
    fetchProjects();
  }, [navigate]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add a project");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        { name: newProjectTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects([...projects, response.data]);
      setNewProjectTitle("");
      setSuccessMessage("Project created successfully!");
    } catch (err) {
      console.error("Failed to create project", err);
      setError("Failed to create project");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Projects</h1>

      {error && (
        <p className="text-red-500 text-center bg-red-100 p-2 rounded">
          {error}
        </p>
      )}
      {successMessage && (
        <p className="text-green-500 text-center bg-green-100 p-2 rounded">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleCreateProject} className="mb-6">
        <div className="flex items-center justify-center space-x-4">
          <input
            type="text"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            placeholder="Enter project title"
            className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Project
          </button>
        </div>
      </form>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4">{project.title}</h2>
              <p className="text-gray-600 mb-4">
                Created on: {new Date(project.createdAt).toLocaleDateString()}
              </p>

              <h3 className="text-lg font-medium mb-2">Todos:</h3>
              <ul className="mb-4">
                {project.todos && project.todos.length > 0 ? (
                  project.todos.map((todo) => (
                    <li
                      key={todo._id}
                      className={`mb-2 flex items-center space-x-2 ${
                        todo.status === "complete"
                          ? "line-through text-green-600"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-sm">
                        {todo.status === "complete" ? "✅" : "🔲"}
                      </span>
                      <span>{todo.description}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No todos available</p>
                )}
              </ul>

              <Link
                to={`/projects/${project._id}`}
                className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
              >
                View Project
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No projects available</p>
      )}
    </div>
  );
};

export default Home;
