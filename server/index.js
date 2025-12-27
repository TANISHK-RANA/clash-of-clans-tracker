const path = require('path');
const fs = require('fs');

// Debug: Show current working directory
const envPath = path.join(process.cwd(), '.env');
console.log('📂 Current working directory:', process.cwd());
console.log('📂 Looking for .env at:', envPath);
console.log('📂 .env file exists:', fs.existsSync(envPath));

// Debug: Read and show .env file contents
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('📄 .env file contents (first 100 chars):', JSON.stringify(envContent.substring(0, 100)));
  console.log('📄 .env file length:', envContent.length, 'bytes');
  
  // Check for common issues
  if (envContent.charCodeAt(0) === 0xFEFF) {
    console.log('⚠️ WARNING: .env file has BOM (Byte Order Mark) - this can cause issues!');
  }
  if (envContent.includes('\r\n')) {
    console.log('📝 Line endings: Windows (CRLF)');
  } else {
    console.log('📝 Line endings: Unix (LF)');
  }
}

const result = require('dotenv').config();
if (result.error) {
  console.log('❌ dotenv error:', result.error.message);
} else {
  console.log('✅ dotenv parsed successfully');
}

// Debug: Show loaded environment variables
console.log('🔧 PORT from env:', process.env.PORT);
console.log('🔧 COC_API_TOKEN from env:', process.env.COC_API_TOKEN ? 'LOADED' : 'NOT LOADED');

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

