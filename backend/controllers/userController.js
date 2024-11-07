import dotenv from 'dotenv';
import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exists" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // validating email format && strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a vailid email' });
        }

        if (password.length < 7) {
            return res.status(400).send({ success: false, message: "Please enter a strong password " });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.status(200).json({ success: true, token });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export {
    loginUser, registerUser, adminLogin,
}