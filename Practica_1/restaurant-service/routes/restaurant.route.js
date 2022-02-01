const express = require('express');
const router = express.Router();

const {
  receiveOrder,
} = require('../controllers/restaurant.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, receiveOrder);


module.exports = router;
