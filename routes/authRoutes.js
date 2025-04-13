const express = require('express');
const router = express.Router();
const { instagramLogin, instagramCallback } = require('../controllers/instagramController');

// Instagram OAuth login route
router.get('/instagram', instagramLogin);

// Instagram OAuth callback route
router.get('/instagram/callback', instagramCallback);

module.exports = router;
