import React from 'react'
import logo from '../../assets/logo.png';
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {IoLogOut} from 'react-icons/io5'
import { useMutation } from '@tanstack/react-query';
import { removeUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../https';
import { MdDashboard } from "react-icons/md";

const Header = () => {

    const userData = useSelector(state => state.user )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutMutation = useMutation({
        mutationFn: () => {
            return logout()
        },

        onSuccess: () => {
            dispatch(removeUser())
            navigate("/auth")
        },

        onError: (error) => {
            console.log(error.message)
        }
    })
    const handleLogout = () => {
        logoutMutation.mutate()
    }

    return (
        <>
        <header className='py-2 px-8 flex justify-between items-center bg-[#1a1a1a]'>
            
            {/* logo */}
            <div 
                onClick={() => navigate("/")}
                className='flex items-center gap-2 cursor-pointer'
            >
                <img 
                    className='w-8 h-8' 
                    src={logo} 
                    alt="restro logo" 
                />
                <h1 className='text-[#f5f5f5] text-lg font-semibold'>Restro</h1>
            </div>

            {
                userData.role === "Admin" && (
                    <div onClick={() => navigate("/dashboard")} className='p-3 cursor-pointer rounded-[15px] flex items-center-safe text-lg gap-1 font-semibold text-[#f5f5f5]'>
                        <MdDashboard className='text-[#f5f5f5] text-xl' /> Dashboard
                    </div>
                )
            }

            {/* displaying logged user details */}
            <div className='flex items-center gap-4'>
                

                <div className='p-3 bg-[#1f1f1f] cursor-pointer rounded-[15px]'>
                    <FaBell className='text-[#f5f5f5] text-2xl' />
                </div>

                <div className='flex items-center gap-3 cursor-pointer'>
                    <FaUserCircle className='text-[#f5f5f5] text-4xl' />
                    <div className='flex flex-col items-start'>
                        <h1 className='text-[#f5f5f5] text-md font-semibold'>{userData.name || "TEST USER"}</h1>
                        <p className='text-[#ababab] text-xs font-medium'>{userData.role || "Role : N/A"}</p>
                    </div>

                    {/* LOGOUT BUTTON */}
                    <IoLogOut
                        onClick={handleLogout} 
                        className="text-[#f5f5f5] ml-2" 
                        size={40} 
                    />
                </div>
            </div>

        </header>
        </>
    )
}

export default Header
