import { NavLink, useNavigate } from "react-router-dom"
import { assets } from "../admin_assets/assets"

export const SideBar = () => {

    return <>
        <div className="w-[18%] min-h-screen border-r-2">
            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 py-2 rounded-1' to='/add'>
                    <img
                        src={assets.add_icon}
                        className="w-5 h-5"
                    />
                    <p className="hidden md:block">Add Items</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 py-2 rounded-1' to='/list'>
                    <img
                        src={assets.order_icon}
                        className="w-5 h-5"
                    />
                    <p className="hidden md:block">List Items</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 py-2 rounded-1' to='/orders'>
                    <img
                        src={assets.add_icon}
                        className="w-5 h-5"
                    />
                    <p className="hidden md:block">Orders</p>
                </NavLink>


            </div>
        </div>
    </>
}