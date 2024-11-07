import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { Title } from '../components/Title';
import { assets } from "../frontend_assets/assets";
import { CartTotal } from "../components/CartTotal";
import { useNavigate } from 'react-router-dom';

export const Cart = () => {

    const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        if (products.length > 0) {

            const tmpData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tmpData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        })
                    }
                }
            }
            setCartData(tmpData);
        }
    }, [cartItems, products]);

    return <>
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div className="">
                {
                    cartData.map((item) => {

                        const productData = products.find((product) => product._id === item._id);
                        return (
                            <div
                                key={productData._id}
                                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                            >
                                <div className="flex items-start gap-6">
                                    <img
                                        src={productData.image[0]}
                                        className="w-16 sm:w-20"
                                    />
                                    <div>
                                        <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>{currency} {productData.price}</p>
                                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, +e.target.value)}
                                />
                                <img
                                    src={assets.bin_icon}
                                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={() => navigate('/place-order')}>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}