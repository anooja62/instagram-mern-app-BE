const { getInstagramAccessToken } = require('../services/instagramService');

const instagramLogin = (req, res) => {
  const { INSTAGRAM_CLIENT_ID, INSTAGRAM_REDIRECT_URI } = process.env;
  const redirectUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
 
  res.redirect(redirectUrl);
};

const instagramCallback = async (req, res) => {
    const code = req.query.code;
    try {
      const tokenData = await getInstagramAccessToken(code);
      // Redirect to frontend with token and user ID
     // const frontendUrl = `https://instagram-mern-app-fe.vercel.app/dashboard?access_token=${tokenData.access_token}&user_id=${tokenData.user_id}`;
     const frontendUrl = `https://instagram-mern-app-fe.vercel.app/dashboard?access_token=${tokenData.access_token}&user_id=${tokenData.user_id}`;
      res.redirect(frontendUrl);
    } catch (error) {
      console.error('OAuth error:', error);
      res.status(500).json({ error: 'OAuth failed' });
    }
  };
  

module.exports = { instagramLogin, instagramCallback };
