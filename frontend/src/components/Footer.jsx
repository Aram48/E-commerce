import { assets } from '../frontend_assets/assets';
import { Link } from 'react-router-dom';


export const Footer = () => {
    return <>
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img
                        src={assets.logo}
                        alt="logo"
                        className='mb-5 w-32'
                    />
                    <p className='w-full md:w-2/3 text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <Link to='/'>
                            <li onClick={() => scrollTo(0, 0)}>Home</li>
                        </Link>
                        <Link to='/about'>
                            <li>About Us</li>
                        </Link>
                        <Link to='/delivery'>
                            <li>Delivery</li>
                        </Link>
                        <Link to='/contact'>
                            <li>Privacy policy</li>
                        </Link>
                    </ul>
                </div>

                <div>
                    <p className='text-xs font-medium mb-5'>GET IN TOUCH</p>
                    <ul>
                        <li>+1-444-444-7890</li>
                        <li>aram.gabrielyann88@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024 © Aram Gabrielyan - All Right Reserved.</p>
            </div>
        </div>
    </>
}