import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {assets} from "../assets/assets"
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Navbar = () => {
    const {user, setShowLogin, setUser, setToken, credit} = useContext(AppContext);
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        setLoggingOut(true);
        setTimeout(()=>{
            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setShowLogin(false);
            toast.success("Logged Out Successfully")
        }, 1200)
    }

    return (
        <div className='flex items-center justify-between py-2'>
            <Link to='/'>
                <img src={assets.logo_image_nobg} alt="Logo-Image-Here" width={150} />
            </Link>

            <div>
                {user ? 
                    <div className='flex items-center gap-2 sm:gap-3 '>
                        <button className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                            <img src={assets.credit_star} className='w-5 cursor-pointer' alt="" />
                            <p onClick={() => navigate("/pricing")} className='text-xs sm:text-sm font-medium text-gray-600'>Credits left: {credit}</p> 
                        </button>
                        <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
                        <div
                            className='relative'
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <img src={assets.profile_icon} className='w-10 drop-shadow cursor-pointer' alt="" />
                            <div
                                className={`
                                    absolute top-0 right-0 z-10 pt-12 transition-all duration-300
                                    ${dropdownOpen ? 'block opacity-100' : 'hidden opacity-0'}
                                `}
                            >
                                <ul className='list-none m-0 p-0 bg-white rounded-md shadow-lg'>
                                    <li>
                                        <button 
                                            onClick={() => {
                                                handleLogout();
                                                setDropdownOpen(false); // Close dropdown after logout
                                            }}
                                            className='w-full text-left px-4 py-2 text-sm text-black hover:bg-red-100 rounded-md hover:text-red-600 transition-colors duration-200'>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> 
                    :
                    <div className='flex items-center gap-2 sm:gap-5'>
                        <p onClick={()=> navigate('/pricing')} className='cursor-pointer text'>Pricing</p>
                        <button onClick={()=> setShowLogin(true)} className='[background-color:#1abc9c] text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer'>Login</button>
                    </div> 
                }
            </div>
        </div>
    )
}

export default Navbar