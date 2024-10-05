
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const navigate = useNavigate();

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects');
        setProjects(data.projects);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };
    fetchProjects();
  }, []);

  // Create a new project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/projects', { title: newProjectTitle });
      setProjects([...projects, data.project]); // Update the project list
      setNewProjectTitle('');
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  // Navigate to a project
  const goToProject = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Create new project */}
      <form onSubmit={handleCreateProject} className="mb-6">
        <input
          type="text"
          value={newProjectTitle}
          onChange={(e) => setNewProjectTitle(e.target.value)}
          placeholder="New project title"
          className="p-2 border border-gray-300 rounded w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Create Project
        </button>
      </form>

      {/* List of projects */}
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project._id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="text-sm">Created on: {new Date(project.createdAt).toLocaleDateString()}</p>
            <button
              className="mt-2 bg-green-500 text-white p-2 rounded"
              onClick={() => goToProject(project._id)}
            >
              View Project
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
