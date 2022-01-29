const fs = require('fs');
const path = require('path');

const logPath = path.resolve('data/orders.json');
const { orderStatus } = require('../utils/status');
const { writeLog } = require('../helpers/logHandler');

const requestOrder = async (req, res) => {
  const { products, restaurant_id } = req.body;
  const { id: userID, username, role } = req.user;

  if (role !== 'CUSTOMER') {
    writeLog({
      username,
      action: 'request order',
      status: 'failed',
      message: 'User is not a customer',
    });
    res.status(401).send({ code: 401, data: 'Unauthorized' });
  }

  try {
    const content = fs.readFileSync(logPath, 'utf8');
    const data = JSON.parse(content);

    const oderID = data[data.length - 1].order_id + 1;
    const newOrder = {
      order_id: oderID,
      user: { id: userID, username },
      products,
      restaurant_id,
      restaurant_order_status: orderStatus[0],
      delivery_order_status: orderStatus[0],
    };
    data.push(newOrder);
    fs.writeFileSync(logPath, JSON.stringify(data));

    writeLog({
      username,
      action: 'request order',
      status: 'success',
      message: 'Order request success',
    });
    res.status(200).send({ code: 200, data: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 500, data: err });
  }
};

module.exports = { requestOrder };
