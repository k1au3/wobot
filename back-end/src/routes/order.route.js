const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createOrderSchema } = require('../middleware/validators/userValidator.middleware');


router.get('/', awaitHandlerFactory(orderController.getAllOrders)); // localhost:3000/api/v1/order
router.get('/:id', awaitHandlerFactory(orderController.getOrderById)); // localhost:3000/api/v1/users/id/1
router.post('/', createOrderSchema, awaitHandlerFactory(orderController.createOrder)); // localhost:3000/api/v1/users/order
router.delete('/:id', awaitHandlerFactory(orderController.deleteOrder)); // localhost:3000/api/v1/users/id/1
router.get('/category/:category', awaitHandlerFactory(orderController.getOrdersBYCategory)); // localhost:3000/api/v1/users/id/1


module.exports = router;