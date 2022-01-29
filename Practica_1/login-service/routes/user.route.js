const express = require('express');
const router = express.Router();

const { encryptPasswords, signin } = require('../controllers/user.controller');

router.route('/encrypt-passwords').get(encryptPasswords);
router.route('/sign-in').post(signin);

module.exports = router;
