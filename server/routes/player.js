const express = require('express');
const router = express.Router();
const { getPlayer } = require('../middleware/cocApi');

// GET /api/player/:tag
router.get('/:tag', async (req, res) => {
  try {
    const { tag } = req.params;
    
    if (!tag) {
      return res.status(400).json({ error: 'Player tag is required' });
    }

    const playerData = await getPlayer(tag);
    res.json(playerData);
  } catch (error) {
    console.error('Error fetching player:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Player not found' });
    }
    if (error.response?.status === 403) {
      return res.status(403).json({ error: 'Access denied. Check API token and IP whitelist.' });
    }
    
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
});

module.exports = router;

