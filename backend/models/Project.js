const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Adjust according to your User model
    required: true,
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo', // Assuming you have a Todo model
  }],
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
