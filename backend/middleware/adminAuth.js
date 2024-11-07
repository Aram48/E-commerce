import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: 'Not Authorized' });
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}


export default adminAuth;