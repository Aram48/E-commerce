import { Link } from 'react-router-dom';
import { assets } from '../admin_assets/assets';

export const NavBar = ({ setToken }) => {
    return <>
        <Link to='/'>
            <div className='flex items-center py-2 px-[4%] justify-between'>
                <img
                    src={assets.logo}
                    alt=""
                    className="w-full min-w-[80px] max-w-[10%]"
                />
                <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
            </div>
        </Link>
    </>
}