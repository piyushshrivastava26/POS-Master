import React, { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../redux/slices/customerSlice';

const BottomNav = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const [isModelOpen, setIisModelOpen] = useState(false)
    const [guestCount, setGuestCount] = useState(0)

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const openModal = () => {
        return setIisModelOpen(true)
    }
    const closeModal = () => {
        return setIisModelOpen(false)
    }

    const increaseGuestCount = () => {
        if(guestCount >= 11){
            return
        }
        setGuestCount((prev) => {
            return prev + 1
        })
    }
    const decreaseGuestCount = () => {
        // setGuestCount(prev => prev > 0 ?  prev - 1 : prev)
        setGuestCount(prev => Math.max(prev-1, 0));
    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    const handleCreateOrder = () => {
        if (!name.trim()) return alert("Enter customer name")
        if (!phone.trim() || phone.length < 10) return alert("Enter valid phone")

        // send data to store
        dispatch(setCustomer({name, phone, guests: guestCount}))

        navigate("/tables")
    }


    return (
        <div className='p-2 bg-[#262626] fixed bottom-0 left-0 right-0 h-13 flex justify-around'>

            <button
                onClick={() => navigate("/")}
                className={`${isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} flex items-center justify-center w-[200px] rounded-3xl`}
            > 
                <FaHome size={20} className='mr-4 inline' /> 
                <p className='text-sm sm:text-base' >Home</p>
            </button>

            <button
                onClick={() => navigate("/orders")}
                className={`${isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} flex items-center justify-center w-[200px] rounded-3xl`}
            > 
                <MdOutlineReorder size={20} className='mr-4 inline' /> 
                <p className='text-sm sm:text-base' >Orders</p>
            </button>

            <button
                onClick={() => navigate("/tables")}
                className={`${isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} flex items-center justify-center w-[200px] rounded-3xl`}
            > 
                <MdTableBar size={20} className='mr-4 inline' /> 
                <p className='text-sm sm:text-base' >Tables</p>
            </button>

            <button
                className={`${isActive("/more") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} flex items-center justify-center w-[200px] rounded-3xl`}
            > 
                <CiCircleMore size={20} className='mr-4 inline' /> 
                <p className='text-sm sm:text-base' >More</p>
            </button>


            <button
                disabled={!(isActive("/") || isActive("/orders"))}
                onClick={openModal}
                className='cursor-pointer p-3 bg-[#F6B100] text-[#f5f5f5] rounded-full items-center absolute bottom-6'
            >
                <BiSolidDish size={30} />
            </button>


            <Modal isOpen={isModelOpen} onClose={closeModal} title="Create Order"  >
                
                <div>
                    <label className='block mb-1 text-[#ababab] text-sm font-medium'>Customer Name</label>
                    <div className='flex items-center bg-[#1f1f1f] rounded px-4 p-3'>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                            name=''
                            placeholder='Enter customer name'
                            id=''
                            className='text-white bg-transparent flex-1 focus:outline-none'
                        />
                    </div>
                </div>

                <div>
                    <label className='block mb-1 mt-3 text-[#ababab] text-sm font-medium'>Phone No</label>
                    <div className='flex items-center bg-[#1f1f1f] rounded px-4 p-3'>
                        <input 
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}

                            name=''
                            placeholder='+91-9999999999'
                            id=''
                            className='text-white bg-transparent flex-1 focus:outline-none'
                        />
                    </div>
                </div>

                <div>
                    <label className='block mb-1 mt-3 text-[#ababab] text-sm font-medium'>Guest</label>
                    <div className='flex items-center justify-between bg-[#1f1f1f] px-4 py-2 rounded-lg'>
                        <button onClick={decreaseGuestCount} className='text-yellow-500 text-2xl cursor-pointer' >&minus;</button>
                        <span className='text-white'>{guestCount} Person</span>
                        <button onClick={increaseGuestCount} className='text-yellow-500 text-2xl cursor-pointer' >&#43;</button>
                    </div>
                </div>

                <button 
                    onClick={handleCreateOrder}
                    className='w-full mt-8 py-2 text-[#f5f5f5] bg-[#f6B100] hover:bg-[#c99206] rounded-lg cursor-pointer'
                >
                    Create Order
                </button>

            </Modal>

        </div>
    )
}

export default BottomNav
