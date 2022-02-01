const fs = require('fs');
const path = require('path');

const readFile = (res, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    res.status(200).send({ code: 200, data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 500, data: err });
  }
};

const dataReport = (_req, res) => {
  const filePath = path.resolve('data/restaurants.json');
  readFile(res, filePath);
};

const logReport = (_req, res) => {
  const filePath = path.resolve('public/transactions.log');
  readFile(res, filePath);
};

module.exports = { dataReport, logReport };
