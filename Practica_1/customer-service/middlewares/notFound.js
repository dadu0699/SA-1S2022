module.exports = (req, res, _next) => {
  res.status(404).send({
    data: '404 - Not Found',
  });
};
