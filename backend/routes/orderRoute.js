import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
import {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    userOrders,
    updateStatus,
    allOrders
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);

// User Features
orderRouter.post('/userorders', authUser, userOrders);

// Verify Payment
orderRouter.post('/verifyStripe', authUser, verifyStripe);

export default orderRouter;