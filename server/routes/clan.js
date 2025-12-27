const express = require('express');
const router = express.Router();
const { getClan, getClanMembers } = require('../middleware/cocApi');

// GET /api/clan/:tag
router.get('/:tag', async (req, res) => {
  try {
    const { tag } = req.params;
    
    if (!tag) {
      return res.status(400).json({ error: 'Clan tag is required' });
    }

    const clanData = await getClan(tag);
    res.json(clanData);
  } catch (error) {
    console.error('Error fetching clan:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Clan not found' });
    }
    if (error.response?.status === 403) {
      return res.status(403).json({ error: 'Access denied. Check API token and IP whitelist.' });
    }
    
    res.status(500).json({ error: 'Failed to fetch clan data' });
  }
});

// GET /api/clan/:tag/members
router.get('/:tag/members', async (req, res) => {
  try {
    const { tag } = req.params;
    
    if (!tag) {
      return res.status(400).json({ error: 'Clan tag is required' });
    }

    const membersData = await getClanMembers(tag);
    res.json(membersData);
  } catch (error) {
    console.error('Error fetching clan members:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Clan not found' });
    }
    
    res.status(500).json({ error: 'Failed to fetch clan members' });
  }
});

module.exports = router;

