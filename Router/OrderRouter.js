import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import order from '../Model/OrderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orderList = await order.find({}).populate('user', 'name');
    res.send(orderList);
}))

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await order.find({ user: req.user._id });
    res.send(orders);
}))

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status('400').send({ message: 'Cart is empty' })
    } else {
        const OrderOne = new order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = await OrderOne.save();
        res.status('201').send({ message: "New Order Created", order: createdOrder });
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const orderData = await order.findById(req.params.id);
    if (orderData) {
        res.send(orderData);
    }
    else {
        res.status('404').send({ message: "Order not Found" });
    }
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const orderData = order.findById(req.params.id);
    if (orderData) {
        orderData.isPaid = true;
        orderData.paidAt = Date.now();
        orderData.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = orderData.save();
        res.send({ "message": "Order Paid", order: updateOrder })
    } else {
        res.status('404').send({ message: "Order is not found" });
    }
}));

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const deleteOrder = await order.findById(req.params.id);
    if (deleteOrder) {
        const deletedOrder = await deleteOrder.deleteOne();
        res.send({ message: 'Order deleted successfully', deletedOrder });
    } else {
        res.status('404').send({ message: "Order is not found" });
    }
}));

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const deliverOrder = await order.findById(req.params.id);
    if (deliverOrder) {
        deliverOrder.isDelivered = true;
        deliverOrder.deliveredAt = Date.now();
        const deliveredOrder = await deliverOrder.save();
        res.send({ message: 'Order delivered successfully', deliveredOrder });
    } else {
        res.status('404').send({ message: "Order is not found" });
    }
}))

export default orderRouter;