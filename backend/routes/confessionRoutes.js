const express = require('express');
const router = express.Router();
const {
  getAllConfessions,
  createConfession,
} = require('../controllers/confessionController');

// GET /api/confessions
router.get('/', getAllConfessions);

// POST /api/confessions
router.post('/', createConfession);

module.exports = router;
