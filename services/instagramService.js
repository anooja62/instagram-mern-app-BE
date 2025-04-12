const axios = require('axios');

const getInstagramAccessToken = async (code) => {
  const {
    INSTAGRAM_CLIENT_ID,
    INSTAGRAM_CLIENT_SECRET,
    INSTAGRAM_REDIRECT_URI,
  } = process.env;

  const response = await axios.post('https://api.instagram.com/oauth/access_token', null, {
    params: {
      client_id: INSTAGRAM_CLIENT_ID,
      client_secret: INSTAGRAM_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: INSTAGRAM_REDIRECT_URI,
      code,
    },
  });

  return response.data;
};

module.exports = { getInstagramAccessToken };
