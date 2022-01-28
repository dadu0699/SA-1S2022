const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const writeLog = (log) => {
  const date = new Date();
  const timestamp = date.toISOString();

  const logPath = path.resolve('public/transactions.log');
  const logObj = {
    id: uuidv4(),
    timestamp,
    ...log,
  };

  fs.readFile(logPath, (err, data) => {
    let logs = [];
    if (!err) logs = JSON.parse(data);
    logs.push(logObj);

    fs.writeFile(logPath, JSON.stringify(logs), (err) => {
      if (err) console.log(err);
    });
  });
};

module.exports = { writeLog };
