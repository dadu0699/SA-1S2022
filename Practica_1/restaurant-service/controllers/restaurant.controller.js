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
        res.status(401).send({ code: 401, data: 'Unauthorized' });
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

        if(order){
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

module.exports = { receiveOrder };
