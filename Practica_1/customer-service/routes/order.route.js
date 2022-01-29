const express = require('express');
const router = express.Router();

const { requestOrder } = require('../controllers/order.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, requestOrder);

module.exports = router;
