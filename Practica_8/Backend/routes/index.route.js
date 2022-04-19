const express = require('express');
const router = express.Router();

router.route('/').get((_req, res) => {
  res.status(200).json({
    status: 200,
    msg: 'API running smoothly',
    data: [],
  });
});

module.exports = router;
