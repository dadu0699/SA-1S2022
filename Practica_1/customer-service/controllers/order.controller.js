const fs = require('fs');
const path = require('path');

const filePath = path.resolve('data/orders.json');
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
    const content = fs.readFileSync(filePath, 'utf8');
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
    fs.writeFileSync(filePath, JSON.stringify(data));

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

const getStatus = (req, res) => {
  const { orderID } = req.query;
  const status = req.status;
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
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    const order = data.find(
      (order) =>
        order.order_id === parseInt(orderID, 10) && order.user.id === userID
    );

    if (!order) {
      writeLog({
        username,
        action: 'request order',
        status: 'failed',
        message: 'Order not found',
      });
      return res.status(404).send({ code: 404, data: 'Order not found' });
    }

    writeLog({
      username,
      action: 'request order',
      status: 'success',
      message: `Order status at verified ${status ? 'restaurant' : 'delivery'}`,
    });

    const { products, restaurant_order_status, delivery_order_status } = order;
    let payload = {};

    console.log(status);
    if (status) {
      payload = { products, restaurant_order_status };
    } else {
      payload = { products, delivery_order_status };
    }

    res.status(200).send({ code: 200, data: payload });
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 500, data: err });
  }
};

const restaurantStatus = (req, res) => {
  req.status = true;
  getStatus(req, res);
};

const deliveryStatus = (req, res) => {
  req.status = false;
  getStatus(req, res);
};

module.exports = { requestOrder, restaurantStatus, deliveryStatus };
