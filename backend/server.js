const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');
const todoRoutes = require('./routes/todo');
const githubRoutes = require('./routes/github');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable CORS

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/projects', projectRoutes); // Project routes
app.use('/api/todos', todoRoutes); // Todo routes
app.use('/api/github', githubRoutes); // GitHub gist routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Server Error');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
