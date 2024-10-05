import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [projects, setProjects] = useState([]); // Initialize projects as an empty array
  const [error, setError] = useState(null); // Optional: to handle errors
  const [newProjectTitle, setNewProjectTitle] = useState(''); // New project title state
  const [successMessage, setSuccessMessage] = useState(''); // Success message for project creation

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        console.log('Fetched projects:', response.data); // Debug: log the response
        setProjects(response.data); // Update the state with the fetched projects
      } catch (err) {
        console.error('Failed to fetch projects', err);
        setError('Failed to fetch projects'); // Set an error message
      }
    };

    fetchProjects();
  }, []);

  // Handle form submission to create a new project
  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/projects', {
        title: newProjectTitle, // Send the new project title
      });
      console.log('Created new project:', response.data);

      // Add the newly created project to the projects list
      setProjects([...projects, response.data]);

      // Clear the input field and show success message
      setNewProjectTitle('');
      setSuccessMessage('Project created successfully!');
    } catch (err) {
      console.error('Failed to create project', err);
      setError('Failed to create project'); // Set an error message if failed
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Projects</h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error if any */}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>} {/* Success message */}

      {/* Create new project form */}
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

      {/* Display list of projects */}
      {projects && projects.length > 0 ? (
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

              {/* Display Todo List */}
              <h3 className="text-lg font-medium mb-2">Todos:</h3>
              <ul className="mb-4">
                {project.todos && project.todos.length > 0 ? (
                  project.todos.map((todo) => (
                    <li
                      key={todo._id}
                      className={`mb-2 flex items-center space-x-2 ${todo.status === 'complete'
                        ? 'line-through text-green-600'
                        : 'text-gray-700'
                        }`}
                    >
                      <span className="text-sm">
                        {todo.status === 'complete' ? '✅' : '🔲'}
                      </span>
                      <span>{todo.description}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No todos available</p>
                )}
              </ul>

              {/* View Project Button */}
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
