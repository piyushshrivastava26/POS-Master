import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav'
import OrderCard from '../components/orders/OrderCard'
import BackButton from '../components/shared/BackButton'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllOrder } from '../https'
import { enqueueSnackbar } from 'notistack'

const Orders = () => {

    const[status, setStatus] = useState("all")

    const {data:resData, error} = useQuery({
        queryKey: ["orders"],

        queryFn: async () => {
            return await getAllOrder()
        },

        placeholderData: keepPreviousData
    })
    if(error){
        enqueueSnackbar("Something went wrong at 'getAllOrder()'", {variant : "error"})
    }

    console.log("orders_data", resData)
    console.log("orders_actual_data", resData?.data.data)
        
    return (
        <>
            <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden'>

                <div className='px-8 py-4 mt-2 flex items-center justify-between'>
                    
                    <div className='flex items-center gap-4'>
                        <BackButton />
                        <h1 className='text-[#e0e0e0] text-2xl font-bold tracking-wider' >Orders</h1>
                    </div>

                    <div className='flex items-center justify-around gap-4'>
                        <button
                            onClick={() => setStatus("all")}
                            className={`${status === "all" && "bg-[#383838] px-4 py-1 rounded-lg"} text-[#ababab] text-base px-4 py-1 font-semibold rounded-lg cursor-pointer`}
                        >
                            All 
                        </button>

                        <button
                            onClick={() => setStatus("progress")}
                            className={`${status === "progress" && "bg-[#383838] px-4 py-1 rounded-lg"} text-[#ababab] text-base px-4 py-1 font-semibold rounded-lg cursor-pointer`}
                        >
                            In Progress 
                        </button>

                        <button
                            onClick={() => setStatus("ready")}
                            className={`${status === "ready" && "bg-[#383838] px-4 py-1 rounded-lg"} text-[#ababab] text-base px-4 py-1 font-semibold rounded-lg cursor-pointer`}
                        >
                            Ready 
                        </button>

                        <button
                            onClick={() => setStatus("completed")}
                            className={`${status === "completed" && "bg-[#383838] px-4 py-1 rounded-lg"} text-[#ababab] text-base px-4 py-1 font-semibold rounded-lg cursor-pointer`}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                <div className='px-16 py-3 flex flex-wrap gap-4 overflow-y-scroll  no-scrollbar'>
                    {
                        resData?.data.data.length > 0 ? (
                            resData.data.data.map((order) => {

                                return <OrderCard key={order._id} order={order} />
                            })
                        ) : (
                            
                                <p className="text-gray-400 text-lg tracking-wide font-medium">
                                    No orders present at the moment
                                </p>
                            
                        )
                    }
                </div>

                <BottomNav />
            </section>
        </>
    )
}

export default Orders
