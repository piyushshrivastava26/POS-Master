import React from 'react'
import { FaCheckDouble, FaCircle } from 'react-icons/fa'
import {getAvatarName} from '../../utils/index.js'

const OrderList = ({key, order}) => {
    return (
        <div className='flex items-center gap-5 mb-2'>
            
            <button className='bg-[#f6b100] text-xl p-2 font-bold rounded-lg'>
                {getAvatarName(order.customerDetails.name)}
            </button>

            <div className='w-full flex items-center justify-between'>

                <div className='flex flex-col items-start gap-1'>
                    <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>
                        {order.customerDetails.name} 
                    </h1>
                    <p className='text-xs text-[#ababab]'>
                        {order.items.length} Items 
                    </p>
                </div>

                <div>
                    <h1 className='text-[#f6b100] text-xs font-semibold border border-[#f6b100] rounded-lg p-1'>
                        Table No: {order?.table?.tableNo}
                    </h1>
                </div>

                <div className='flex flex-col items-end gap-1'>
                    {
                        order.orderStatus === "Ready" ? (
                            <>
                            <p className=' text-green-600'>
                                <FaCheckDouble className='inline mr-2' /> {order.orderStatus} 
                            </p>
                            </>
                        ) : (
                            <>
                            <p className=' text-yellow-600'>
                                <FaCircle className='inline mr-2' /> {order.orderStatus} 
                            </p>
                            </>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default OrderList