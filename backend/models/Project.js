
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'complete'], default: 'pending' },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  todos: [TodoSchema],
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
