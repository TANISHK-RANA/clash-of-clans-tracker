const axios = require('axios');
const https = require('https');

const COC_API_BASE = 'https://api.clashofclans.com/v1';

// Debug: Check if token is loaded
console.log('🔑 API Token loaded:', process.env.COC_API_TOKEN ? 'Yes (length: ' + process.env.COC_API_TOKEN.length + ')' : 'NO - TOKEN MISSING!');
if (process.env.COC_API_TOKEN) {
  console.log('🔑 Token preview:', process.env.COC_API_TOKEN.substring(0, 20) + '...');
}

// Create HTTPS agent that bypasses SSL certificate validation
// This is needed for corporate networks with SSL inspection
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// Create axios instance with default config
const cocClient = axios.create({
  baseURL: COC_API_BASE,
  headers: {
    'Authorization': `Bearer ${process.env.COC_API_TOKEN}`,
    'Accept': 'application/json'
  },
  httpsAgent: httpsAgent
});

// Helper to encode player/clan tags (# becomes %23)
const encodeTag = (tag) => {
  // Remove # if present and re-add encoded version
  const cleanTag = tag.startsWith('#') ? tag.substring(1) : tag;
  return `%23${cleanTag}`;
};

// Fetch player data
const getPlayer = async (tag) => {
  const encodedTag = encodeTag(tag);
  console.log(`📡 Fetching player: ${encodedTag}`);
  try {
    const response = await cocClient.get(`/players/${encodedTag}`);
    console.log('✅ Player fetch successful');
    return response.data;
  } catch (error) {
    console.log('❌ Player fetch failed:', error.response?.status, error.response?.data);
    throw error;
  }
};

// Fetch clan data
const getClan = async (tag) => {
  const encodedTag = encodeTag(tag);
  const response = await cocClient.get(`/clans/${encodedTag}`);
  return response.data;
};

// Fetch clan members
const getClanMembers = async (tag) => {
  const encodedTag = encodeTag(tag);
  const response = await cocClient.get(`/clans/${encodedTag}/members`);
  return response.data;
};

module.exports = {
  getPlayer,
  getClan,
  getClanMembers,
  encodeTag
};

