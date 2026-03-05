const express = require('express');
const router = express.Router();
// Controller will be imported here by M6

router.get('/', (req, res) => {
  res.json({ message: "API list confessions" });
});

router.post('/', (req, res) => {
  res.json({ message: "API create confession" });
});

module.exports = router;
