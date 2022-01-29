const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

module.exports = { generateToken };
