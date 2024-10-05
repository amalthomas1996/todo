// routes/github.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to export project summary as a secret gist
// POST /api/github/gist
router.post('/gist', async (req, res) => {
  const { description, filename, content } = req.body;

  try {
    // Create a secret gist on GitHub using the provided project details
    const response = await axios.post(
      'https://api.github.com/gists',
      {
        description,
        public: false, // Setting the gist as secret
        files: {
          [filename]: { content }, // Gist file content in markdown format
        },
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`, // GitHub token from environment variables
        },
      }
    );
    res.status(200).json({ gistUrl: response.data.html_url }); // Send the gist URL back to the client
  } catch (error) {
    console.error('Error creating gist', error);
    res.status(500).send('Failed to create gist');
  }
});

module.exports = router;
