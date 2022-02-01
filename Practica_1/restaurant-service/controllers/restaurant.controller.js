const fs = require('fs');
const path = require('path');

const filePath = path.resolve('data/restaurants.json');
const { orderStatus } = require('../utils/status');
const { writeLog } = require('../helpers/logHandler');

const receiveOrder = async (req, res) => {
    const { orderID, restaurant_id } = req.body;
    const { id: userID, username, role } = req.user;

    if (role !== 'RESTAURANT') {
        writeLog({
            username,
            action: 'receive order',
            status: 'failed',
            message: 'User is not a restaurant',
        });
        return res.status(401).send({ code: 401, data: 'Unauthorized' });
    }
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        const restaurant = data.find(
            (restaurant) =>
                restaurant.restaurant_id === parseInt(userID, 10)
        );

        const order = restaurant.orders.find(
            (order) => order.order_id === orderID
        );

        if (order) {
            writeLog({
                username,
                action: 'received order',
                status: 'failed',
                message: 'Order already received',
            });
            return res.status(404).send({ code: 404, data: 'Order already received' });
        }

        const newOrder = {
            order_id: orderID,
            client_order_status: orderStatus[6],
            delivery_order_status: orderStatus[0],
        };
        restaurant.orders.push(newOrder);
        fs.writeFileSync(filePath, JSON.stringify(data));

        writeLog({
            username,
            action: 'receive order',
            status: 'success',
            message: 'order received successfully',
        });
        res.status(200).send({ code: 200, data: restaurant.orders });
    } catch (err) {
        console.error(err);
        res.status(500).send({ code: 500, data: err });
    }

};

const setStatus = (req, res) => {
    const { orderID, newStatus } = req.query;
    const status = req.status;
    const { id: userID, username, role } = req.user;

    if (role !== 'RESTAURANT') {
        writeLog({
            username,
            action: 'change order status',
            status: 'failed',
            message: 'User is not a restaurant',
        });
      return  res.status(401).send({ code: 401, data: 'Unauthorized' });
    }

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);


        const restaurant = data.find(
            (restaurant) =>
                restaurant.restaurant_id === parseInt(userID, 10)
        );

        const order = restaurant.orders.find(
            (order) => order.order_id === parseInt(orderID, 10)
        );

        if (!order) {
            writeLog({
                username,
                action: 'change order status',
                status: 'failed',
                message: 'Order not found',
            });
            return res.status(404).send({ code: 404, data: 'Order not found' });
        }


        console.log(status);
        if (status) {
            order.client_order_status = orderStatus[newStatus];
        } else {
            order.delivery_order_status = orderStatus[9];
        }

        fs.writeFileSync(filePath, JSON.stringify(data));


        writeLog({
            username,
            action: 'change order status',
            status: 'success',
            message: `Order ${status ? 'status updated' : 'ready for pick up'}`,
        });

        res.status(200).send({ code: 200, data: order });
    } catch (err) {
        console.error(err);
        res.status(500).send({ code: 500, data: err });
    }
};

const clientStatus = (req, res) => {
    req.status = true;
    setStatus(req, res);
};

const deliveryStatus = (req, res) => {
    req.status = false;
    setStatus(req, res);
};

module.exports = { receiveOrder, clientStatus, deliveryStatus };
