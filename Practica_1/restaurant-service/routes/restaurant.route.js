const express = require('express');
const router = express.Router();

const {
  receiveOrder,
  clientStatus,
  deliveryStatus,
} = require('../controllers/restaurant.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, receiveOrder);
router.route('/client-status').get(validateToken, clientStatus);
router.route('/delivery-status').get(validateToken, deliveryStatus);

module.exports = router;
