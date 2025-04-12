const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import axios to make API calls

// Instagram OAuth redirect route
router.get('/instagram', (req, res) => {
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI; // Set this in .env
  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  const authUrl = `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile&response_type=code`;

  res.redirect(authUrl);
});

// Instagram OAuth callback route
router.get('/instagram/callback', async (req, res) => {
  const { code } = req.query; // Get the 'code' parameter from the query string

  if (!code) {
    return res.status(400).send('No code found');
  }

  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

  // Exchange the code for an access token
  try {
    const response = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code: code,
    });

    // Extract the access token and user details from the response
    const { access_token, user_id } = response.data;

    // Do something with the access token, like saving it to the session or DB
    // For now, let's just send the access token to the user (for testing purposes)
    res.json({ access_token, user_id });
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).send('Error authenticating with Instagram');
  }
});

module.exports = router;
