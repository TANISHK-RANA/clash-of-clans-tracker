require('dotenv').config();
const express = require('express');
const cors = require('cors');

const playerRoutes = require('./routes/player');
const clanRoutes = require('./routes/clan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/player', playerRoutes);
app.use('/api/clan', clanRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Clash of Clans Tracker API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏰 CoC Tracker Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   GET /api/player/:tag`);
  console.log(`   GET /api/clan/:tag`);
  console.log(`   GET /api/clan/:tag/members`);
});

