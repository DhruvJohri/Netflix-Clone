require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS, assets)
app.use(express.static(path.join(__dirname, '/')));

// OMDb movie API route (was omdb.js)
app.get('/movie-api/search', async (req, res) => {
  const { title } = req.query;
  const apiKey = process.env.OMDB_API_KEY;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
      title
    )}`;
    const result = await axios.get(url);
    if (result.data.Response === 'False') {
      return res.status(404).json({ error: result.data.Error });
    }
    res.json(result.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
