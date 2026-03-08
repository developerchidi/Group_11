const mongoose = require('mongoose');

const confessionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  author_alias: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'slate'
  },
  votes: {
    type: Number,
    default: 0
  },
  voted_users: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Confession', confessionSchema);
