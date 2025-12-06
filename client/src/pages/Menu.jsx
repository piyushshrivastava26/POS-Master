import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import MenuContainer from '../components/menu/MenuContainer';

import { IoRestaurant } from "react-icons/io5";
import CartInfo from '../components/menu/CartInfo';
import CustomerInfo from '../components/menu/CustomerInfo';
import BillsInfo from '../components/menu/BillsInfo';
import { useSelector } from 'react-redux';

const Menu = () => {


    const customerData = useSelector(state => state.customer)





    return (
        <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
            
            {/* left div */}
            <div className=' flex-3'>
                <div className='px-8 py-3 mt-2 mr-2 flex items-center justify-between'>
                    
                    <div className='flex items-center gap-4'>
                        <BackButton />
                        <h1 className='text-[#e0e0e0] text-2xl font-bold tracking-wider' >Menu</h1>
                    </div>

                    <div className='flex items-center justify-around gap-4'>
                        <div className='flex items-center gap-3 cursor-pointer'>
                            <IoRestaurant  className='text-[#f5f5f5] text-4xl' />
                            <div className='flex flex-col items-start'>
                                <h1 className='text-[#f5f5f5] text-md font-semibold'>{customerData.customerName || "Customer Name"}</h1>
                                <p className='text-[#ababab] text-xs font-medium'>Table : {customerData.table?.tableNo || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <MenuContainer />
            </div>



            {/* right div -> CUSTOMER INFO, CART ITEMS & BILLs */}
            <div className='flex-1 bg-[#1a1a1a] mt-3 mr-3 p-2 h-[578px] rounded-lg'>

                {/* customer info */}
                <CustomerInfo />
                <hr className="border-[#2a2a2a] border-t-2" />

                {/* cart items */}
                <CartInfo />
                <hr className="border-[#2a2a2a] border-t-2" />

                {/* bills */}
                <BillsInfo />

            </div>
            

            <BottomNav />
        </section>
    )
}

export default Menu
