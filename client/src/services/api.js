const API_BASE = '/api';

/**
 * Fetch player data by tag
 * @param {string} tag - Player tag (with or without #)
 * @returns {Promise<Object>} Player data
 */
export const getPlayer = async (tag) => {
  const cleanTag = tag.startsWith('#') ? tag.substring(1) : tag;
  const response = await fetch(`${API_BASE}/player/${cleanTag}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch player');
  }
  
  return response.json();
};

/**
 * Fetch clan data by tag
 * @param {string} tag - Clan tag (with or without #)
 * @returns {Promise<Object>} Clan data
 */
export const getClan = async (tag) => {
  const cleanTag = tag.startsWith('#') ? tag.substring(1) : tag;
  const response = await fetch(`${API_BASE}/clan/${cleanTag}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch clan');
  }
  
  return response.json();
};

/**
 * Fetch clan members by tag
 * @param {string} tag - Clan tag (with or without #)
 * @returns {Promise<Object>} Clan members data
 */
export const getClanMembers = async (tag) => {
  const cleanTag = tag.startsWith('#') ? tag.substring(1) : tag;
  const response = await fetch(`${API_BASE}/clan/${cleanTag}/members`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch clan members');
  }
  
  return response.json();
};

