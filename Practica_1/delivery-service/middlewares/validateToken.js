const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.header('authorization');
  let token;

  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    token = authorization.substring(7);

  if (!token) return res.status(401).send({ code: 401, data: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ code: 401, data: 'Unauthorized' });
  }
};
