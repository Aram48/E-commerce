import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mogodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
dotenv.config();

// APP Config
const app = express();
const PORT = process.env.PORT;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API end points
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});