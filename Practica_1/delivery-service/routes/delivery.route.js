const express = require('express');
const router = express.Router();

const {
  deliveryOrder,
  clientStatus,
  deliveryStatus,
} = require('../controllers/delivery.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, deliveryOrder);
router.route('/client-status').get(validateToken, clientStatus);
router.route('/delivery-status').get(validateToken, deliveryStatus);

module.exports = router;
