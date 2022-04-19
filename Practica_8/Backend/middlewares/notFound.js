module.exports = (_req, res, _next) => {
  res.status(404).json({
    code: 404,
    response: 'Page not found',
  });
};
