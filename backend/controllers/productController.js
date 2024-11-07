import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price: +price,
            category, subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? "true" : "false",
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        return res.status(200).json({ success: true, message: 'Product Added' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

//function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.status(200).json({ success: true, products });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

// function for removing products
const removeProducts = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        return res.status(200).json({ success: true, message: 'Product Removed' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: true, message: 'Server error', error });
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        return res.status(200).json({ success: true, product });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}

export {
    addProduct, listProducts, removeProducts, singleProduct
}