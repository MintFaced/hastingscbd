const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve data files
app.use('/data', express.static(path.join(__dirname, 'data')));

// API endpoint for raw data
app.get('/api/posts', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'posts-200.json'));
});

app.get('/api/businesses', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'businesses.json'));
});

// Health check for Railway
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Hastings Spotlight running on port ${PORT}`);
});
