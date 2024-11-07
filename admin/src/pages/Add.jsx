import { useState } from "react";
import { assets } from "../admin_assets/assets";
import axios from 'axios';
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export const Add = ({ token }) => {

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('bestseller', bestseller);
            formData.append('sizes', JSON.stringify(sizes));

            image1 && formData.append('image1', image1);
            image2 && formData.append('image2', image2);
            image3 && formData.append('image3', image3);
            image4 && formData.append('image4', image4);

            const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
                setSizes([]);
                setCategory('Men');
                setSubCategory('Topwear');
                setBestseller(false);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full items-start gap-3">
            <div>
                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2">
                    <label htmlFor="image1">
                        <img
                            src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                            className="w-20 cursor-pointer"
                        />
                        <input
                            type="file"
                            id="image1"
                            onChange={e => setImage1(e.target.files[0])}
                            hidden
                        />
                    </label>

                    <label htmlFor="image2">
                        <img
                            src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                            className="w-20 cursor-pointer"
                        />
                        <input type="file" id="image2" onChange={e => setImage2(e.target.files[0])} hidden />
                    </label>

                    <label htmlFor="image3">
                        <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} className="w-20 cursor-pointer" />
                        <input
                            type="file"
                            id="image3"
                            onChange={e => setImage3(e.target.files[0])}
                            hidden
                        />
                    </label>

                    <label htmlFor="image4">
                        <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} className="w-20 cursor-pointer" />
                        <input
                            type="file"
                            id="image4"
                            onChange={e => setImage4(e.target.files[0])}
                            hidden
                        />
                    </label>
                </div>
            </div>

            <div className="w-full">
                <p className="mb-2">Product Name</p>
                <input
                    type="text"
                    placeholder="Type Here"
                    className="w-full max-w-[500px] px-3 py-2"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="w-full">
                <p className="mb-2">Product Description</p>
                <textarea
                    placeholder="Write content here..."
                    className="w-full max-w-[500px] px-3 py-2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Product Category</p>
                    <select
                        className="w-full px-3 py-2"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <p className="mb-2">Sub Category</p>
                    <select
                        className="w-full px-3 py-2"
                        value={subCategory}
                        onChange={e => setSubCategory(e.target.value)}
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className="mb-2">Product price</p>
                    <input
                        type="number"
                        placeholder="25"
                        className="w-full px-3 py-2 sm:w-[120px]"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3">
                    <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(x => x !== 'S') : [...prev, 'S'])}>
                        <p className={`${sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(x => x !== 'M') : [...prev, 'M'])}>
                        <p className={`${sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(x => x !== 'L') : [...prev, 'L'])}>
                        <p className={`${sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(x => x !== 'XL') : [...prev, 'XL'])}>
                        <p className={`${sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(x => x !== 'XXL') : [...prev, 'XXL'])}>
                        <p className={`${sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <input
                    type="checkbox"
                    id="bestseller"
                    checked={bestseller}
                    onChange={() => setBestseller(prev => !prev)}
                />
                <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
            </div>

            <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">ADD</button>
        </form>
    );
};