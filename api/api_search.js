```javascript
const axios = require('axios');

module.exports = async (req, res) => {
  const { q } = req.query;
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q,
        maxResults: 10,
        key: YOUTUBE_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching YouTube API:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};
```