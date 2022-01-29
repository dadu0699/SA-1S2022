const express = require('express');
const router = express.Router();

const {
  requestOrder,
  restaurantStatus,
  deliveryStatus,
} = require('../controllers/order.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, requestOrder);
router.route('/restaurant-status').get(validateToken, restaurantStatus);
router.route('/delivery-status').get(validateToken, deliveryStatus);

module.exports = router;
