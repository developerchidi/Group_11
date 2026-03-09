const express = require('express');
const router = express.Router();
const {
  getAllConfessions,
  createConfession,
  voteConfession,
} = require('../controllers/confessionController');

const badWords = require('../middleware/badWordsFilter');
const rateLimiter = require('../middleware/rateLimiter');

// GET /api/confessions
router.get('/', getAllConfessions);

// POST /api/confessions (rate limit + kiểm tra bad words)
router.post('/', rateLimiter, badWords, createConfession);

// vote endpoint
router.post('/:id/vote', rateLimiter, voteConfession);

module.exports = router;
