const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const like = mongoose.model('User', likeSchema);

module.exports = like;
