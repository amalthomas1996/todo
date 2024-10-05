import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ProjectView from './pages/ProjectView';
import Login from './pages/Login'; // Ensure you have a Login page

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Login />} /> {/* Redirect to the login page */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectView />} />
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown routes to login */}
    </Routes>

  );
};

export default App;