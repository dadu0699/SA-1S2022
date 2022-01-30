const express = require('express');
const router = express.Router();

const { dataReport, logReport } = require('../controllers/report.controller');

router.route('/data').get(dataReport);
router.route('/log').get(logReport);

module.exports = router;
