import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();


const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('DB Connected');

    });

    await mongoose.connect(`${process.env.MOGODB_URI}/e-commerce`);
}


export default connectDB;