import React, { useEffect, useRef } from 'react'
import { FaNotesMedical } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../../redux/slices/cartSlice'

const CartInfo = () => {

    const cartData = useSelector(state => state.cart)

    const dispatch = useDispatch()
    const scrollRef = useRef()

    
    const handleRemove = (itemId) => {
        
        dispatch(removeItem(itemId))
    }

    const handleIncreaseInNoOfQuantity = (item) => {

        const newObj = {
            id: Date.now().toString(),
            name: item.name,
            pricePerQuantity: item.pricePerQuantity,
            quantity: 1,   // increase by 1
            price: item.pricePerQuantity
        }

        dispatch(addItem(newObj))
    }

    // to scroll to bottom when the item is added but showing in the ui part
    useEffect(() => {

        if(scrollRef.current){
            scrollRef.current.scrollTo({
                
                top: scrollRef.current.scrollHeight,
                behavior: "smooth"
            })
        }

    }, [cartData])


    return (
        <>
            <div className='px-3 py-2'>
                    
                <h1 className='text-md text-[#e4e4e4] font-semibold tracking-wide'>
                    Order Details 
                </h1>

                <div ref={scrollRef} className='mt-2 overflow-y-scroll no-scrollbar h-[232px]'>
                    
                    {
                        cartData.length === 0 ? (
                            
                            <p 
                                className='text-[#ababab] text-xs h-48 flex justify-center items-center'
                            >
                                Cart is empty. Start adding Dishes
                            </p>


                        ) : cartData.map((item) => {
                            return (
                                <div key={item.id} className='bg-[#1f1f1f] px-3 py-2 mb-2 rounded-lg'>

                                    <div className='flex items-center justify-between'>
                                        <h1 className='text-[#ababab] font-semibold tarcking-wide text-base'>
                                            {item.name}
                                        </h1>
                                        <p className='text-[#ababab] text-sm font-semibold'>
                                            x{item.quantity}
                                        </p>
                                    </div>

                                    <div className='flex items-center justify-between mt-2'>
                                        <div className='flex items-center gap-4'>
                                            
                                            <RiDeleteBin2Fill 
                                                onClick={() => handleRemove(item.id)}
                                                className='text-[#ababab] cursor-pointer' 
                                                size={20}
                                            />

                                            <FaNotesMedical
                                                onClick={() => handleIncreaseInNoOfQuantity(item)} 
                                                className='text-[#ababab] cursor-pointer' 
                                                size={20}
                                            />

                                        </div>

                                        <p className='text-[#f5f5f5] text-base font-bold'>₹{item.price}</p>
                                    </div>

                                </div>
                            )
                        })
                    }


                </div>

                
            </div>
        </>
    )
}

export default CartInfo
