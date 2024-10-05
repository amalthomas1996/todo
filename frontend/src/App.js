import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProjectView from './pages/ProjectView';

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectView />} />
      {/* Add any other routes you may have */}
    </Routes>

  );
};

export default App;
