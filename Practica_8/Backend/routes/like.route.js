const express = require('express');
const router = express.Router();

const {
  likeCounter,
  newLike,
  removeLike,
} = require('../controllers/like.controller');

router.route('/').get(likeCounter).post(newLike).delete(removeLike);

module.exports = router;
