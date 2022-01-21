const express = require('express');
const router = express.Router();

router.route('/').get((_req, res) => {
  res.status(200).send({
    data: 'API running smoothly',
  });
});

module.exports = router;
