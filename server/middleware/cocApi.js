const axios = require('axios');
const https = require('https');

const COC_API_BASE = 'https://api.clashofclans.com/v1';

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
  const response = await cocClient.get(`/players/${encodedTag}`);
  return response.data;
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

