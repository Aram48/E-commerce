import { Title } from "../components/Title"
import { CartTotal } from '../components/CartTotal';
import { assets } from "../frontend_assets/assets";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

export const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const navigate = useNavigate();
    const { token, backendUrl, cartItems, setCartItems, getCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    });

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            let orderitems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = { ...products.find(product => product._id === items) }
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderitems.push(itemInfo);
                        }
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderitems,
                amount: getCartAmount() + delivery_fee,
            }

            switch (method) {
                // API calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
                    if (response.data.success) {
                        setCartItems({});
                        navigate('/orders');
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data;
                        window.location.replace(session_url);
                    } else {
                        toast.error(responseStripe.data.message);
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast(error.message);
        }
    }


    return <>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-4 min-h-[80--vh] border-t">

            {/* {---- Left Side ----} */}

            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="First name"
                        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <input
                    type="email"
                    placeholder="Email addess"
                    className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Street"
                    className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
                    name="street"
                    value={formData.street}
                    onChange={handleOnChange}
                    required
                />

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="City"
                        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
                        name="city"
                        value={formData.city}
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="State"
                        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
                        name="state"
                        value={formData.state}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Zip code"
                        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
                        name="country"
                        value={formData.country}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <input
                    type="number"
                    placeholder="Phone"
                    className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
                    name="phone"
                    value={formData.phone}
                    onChange={handleOnChange}
                    required
                />
            </div>

            {/* { ----- Right Side -----} */}

            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>

                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* { ---- Payment Method Selection -----} */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img
                                src={assets.stripe_logo}
                                className="h-5 mx-4"
                            />
                        </div>
                        <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className="w-full text-end mt-8">
                        <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    </>
}