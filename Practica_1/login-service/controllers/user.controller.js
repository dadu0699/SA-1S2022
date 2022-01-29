const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const logPath = path.resolve('data/users.json');
const { generateToken } = require('../helpers/jwt');
const { writeLog } = require('../helpers/logHandler');

const encryptPasswords = async (_req, res) => {
  try {
    const content = fs.readFileSync(logPath, 'utf8');
    let data = JSON.parse(content);

    for (const u of data) u.password = await bcrypt.hash(u.password, 10);

    fs.writeFileSync(logPath, JSON.stringify(data));
    res.status(500).send({ code: 500, data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 500, data: err });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  const unauthorizedMSG = 'Incorrect username and/or password';

  try {
    const content = fs.readFileSync(logPath, 'utf8');
    const data = JSON.parse(content);

    const user = data.find((u) => u.username === username);
    if (!user) {
      writeLog({
        username,
        action: 'signin',
        status: 'fail',
        message: unauthorizedMSG,
      });
      return res.status(400).send({ code: 400, data: unauthorizedMSG });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      writeLog({
        user: username,
        action: 'signin',
        status: 'fail',
        message: unauthorizedMSG,
      });
      return res.status(400).send({ code: 400, data: unauthorizedMSG });
    }

    const payload = { id: user.id, username, role: user.role };
    const token = await generateToken(payload);

    writeLog({
      user: username,
      action: 'signin',
      status: 'success',
      message: 'User logged in',
    });
    res.status(200).send({ code: 200, data: { ...payload, token } });
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 500, data: err });
  }
};

module.exports = { encryptPasswords, signin };
