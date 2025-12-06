import React from 'react'
import { FaCheckDouble, FaCircle } from 'react-icons/fa'
import {formatDateAndTime, getAvatarName} from '../../utils/index.js'

const OrderCard = ({key, order}) => {

    console.log("Order_key", key)
    console.log("Order_order", order)

    return (
        <>
            <div className='bg-[#262626] w-[450px] rounded-lg mb-1 p-4'>
                        
                <div className='flex items-center gap-4'>
                    <button className='bg-[#f6b100] text-xl p-2 font-bold rounded-lg'>
                        {getAvatarName(order.customerDetails.name)}
                    </button>
        
                    <div className='w-full flex items-center justify-between'>
        
                        <div className='flex flex-col items-start gap-1'>
                            <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>
                                {order.customerDetails.name} 
                            </h1>
                            <p className='text-xs text-[#ababab]'>
                                #{Math.floor(new Date(order.orderDate).getTime())} / Dine in
                            </p>
                            <p className='text-xs text-[#ababab]'>
                                Table: {order?.table?.tableNo}
                            </p>
                        </div>
        
                        <div className='flex flex-col items-end gap-1'>
                            {
                                order.orderStatus === "Ready" ? (
                                    <>
                                    <p className=' text-green-600 text-xs bg-[#2b493e] py-1 px-3 rounded-lg'>
                                        <FaCheckDouble className='inline mr-2' /> {order.orderStatus} 
                                    </p>
                                    <p className='text-[#ababab] text-xs'>
                                        <FaCircle className='inline mr-2 text-green-600' /> Ready to Serve 
                                    </p>
                                    </>
                                ) : (
                                    <>
                                    <p className=' text-yellow-600 text-xs bg-[#4a452e] py-1 px-3 rounded-lg'>
                                        <FaCheckDouble className='inline mr-2' /> {order.orderStatus} 
                                    </p>
                                    <p className='text-[#ababab] text-xs'>
                                        <FaCircle className='inline mr-2 text-yellow-600' /> Preparing your Order
                                    </p>
                                    </>
                                )
                            }
                        </div>
        
                    </div>
                </div>

                <div className='text-[#ababab] text-sm mt-4 flex items-center justify-between'>
                    <p>
                        {formatDateAndTime(order.createdAt)}
                    </p>
                    <p>{order.items.length} Items</p>

                </div>
                
                <hr className='text-[#f5f5f5] w-full mt-2 border-gray-500' />

                <div className='flex items-center justify-between mt-3'>
                    <h1 className='text-[#f5f5f5] text-lg font-semibold '>
                        Total
                    </h1>
                    <p className='text-[#f5f5f5] text-lg font-semibold '>₹{order.bills.totalWithTax.toFixed(2)}</p>
                </div>
            </div>
        </>
    )
}

export default OrderCard
