import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ProjectView from './pages/ProjectView';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/projects/:projectId" element={
        <ProtectedRoute>
          <ProjectView />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/Login" />} />
    </Routes>

  );
};

export default App;
