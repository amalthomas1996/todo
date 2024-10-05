
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await axios.get(`/api/projects/${id}`);
      setProject(data.project);
    };
    fetchProject();
  }, [id]);

  // Format project data for gist export
  const formatProjectSummary = () => {
    if (!project) return '';
    const pendingTodos = project.todos.filter(todo => todo.status === 'pending');
    const completedTodos = project.todos.filter(todo => todo.status === 'completed');
    return `
# ${project.title}

## Summary
${completedTodos.length} / ${project.todos.length} completed

## Pending Tasks
${pendingTodos.map(todo => `- [ ] ${todo.description}`).join('\n')}

## Completed Tasks
${completedTodos.map(todo => `- [x] ${todo.description}`).join('\n')}
    `;
  };

  // Export project as secret gist
  const exportToGist = async () => {
    const gistContent = formatProjectSummary();
    try {
      await axios.post('/api/github/gist', {
        description: `Project: ${project.title}`,
        filename: `${project.title}.md`,
        content: gistContent,
      });
      alert('Gist created successfully!');
    } catch (error) {
      console.error('Failed to create gist', error);
    }
  };

  return (
    <div className="p-4">
      {project ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{project.title}</h1>

          {/* Todo list */}
          <ul className="mb-6">
            {project.todos.map((todo) => (
              <li key={todo._id} className={`p-2 mb-2 border ${todo.status === 'completed' ? 'bg-green-200' : 'bg-white'}`}>
                {todo.description}
              </li>
            ))}
          </ul>

          {/* Export button */}
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={exportToGist}
          >
            Export as Gist
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProjectView;
