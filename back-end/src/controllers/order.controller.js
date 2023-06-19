const OrderModel = require('../models/order.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

class OrderController {

    createOrder = async (req, res, next) => {
        this.checkValidation(req.body);
        
        
        const result = await OrderModel.addOrder(req.body);
        
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
    
        res.status(200).send('Order added successfully!');
    };

    getAllOrders = async (req, res, next) => {
        let userList = await OrderModel.find();
        if (!userList.length) {
            throw new HttpException(404, 'Orders not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.send(userList);
    };

    getOrderById = async (req, res, next) => {
        const user = await OrderModel.findOne({ id: req.params.id });
        if (!user) {
            throw new HttpException(404, 'Order not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getOrdersBYCategory = async (req, res, next) => {
        const user = await OrderModel.findOne({ order_category: req.params.category });
        if (!user) {
            throw new HttpException(404, 'Order not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    }

    deleteOrder = async (req, res, next) => {
        const result = await OrderModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Order not found');
        }
        res.send('Order has been deleted');
    };


    // If you fix this and test this you'll have to add the data again manually.
    deleteAllOrders = async (req, res, next) => {
        let result = await OrderModel.find();
        // const result = await OrderModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Order not found');
        }
        result = await OrderModel.deleteAllyea();
        res.send('All orders deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation failed', errors);
        }
    };
}


module.exports = new OrderController;


