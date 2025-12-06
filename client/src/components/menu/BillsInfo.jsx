import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalPrice, removeAllItems } from '../../redux/slices/cartSlice'
import { useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { addOrder, createOrderRazorpay, updateTable, verifyRazorpayPayment } from '../../https'
import { useMutation } from '@tanstack/react-query'
import { removeCustomer } from '../../redux/slices/customerSlice'
import Invoice from '../invoice/invoice'



function loadScript(src){

    return new Promise((resolve) => {

        const script = document.createElement("script")
        script.src = src
    
        script.onload = () => {
            resolve(true)
        }

        script.onerror = () => {
            resolve(false)
        }

        document.body.appendChild(script)
    })
}


const BillsInfo = () => {

    const dispatch = useDispatch()

    const customerData = useSelector(state => state.customer)
    const cartData = useSelector(state => state.cart)

    
    const total = useSelector(getTotalPrice)
    const taxRateinPercent = 5
    const tax = (total * taxRateinPercent) / 100
    const totalPriceWithTax = total + tax
    
    const [paymentMethod, setPaymentMethod] = useState()
    const [showInvoice, setShowInvoice] = useState(false)
    const [orderInfo, setOrderInfo] = useState()

    const handlePlaceOrder = async () => {
        if(!paymentMethod){
            enqueueSnackbar("Please select a payment method", {variant: "warning"})
            
            return
        }

        if(paymentMethod === "Online"){
            // NOW PAYMENT METHOD IS PROVIDED, LOAD RAZORPAY NOW
            try {
                
                const res = await loadScript(
                    "https://checkout.razorpay.com/v1/checkout.js"
                )

                if(!res){
                    enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {variant : "warning"})
                    return
                }

                // CREATE ORDER
                const reqData = {
                    amount: Math.round(totalPriceWithTax * 100)
                }

                const {data} = await createOrderRazorpay(reqData)
                // console.log("Order API response:", data)

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: data.order.amount,
                    currency: data.order.currency,

                    name: "RESTRO",
                    description: "Secure Payment for Your Meal",
                    order_id: data.order.id,

                    handler: async function (response) {

                        const verification = await verifyRazorpayPayment(response)
                        console.log(verification)
                        enqueueSnackbar(verification.data.message, { variant: "success" });

                        // AFTER PAYMENT's SUCCESSFUL VERIFICATION, place the order
                        const orderData = {
                            
                            customerDetails: {
                                name: customerData.customerName,
                                phone: customerData.customerPhone,
                                guests: customerData.guests
                            },

                            orderStatus : "In Progress",

                            bills : {
                                total: total,
                                tax: tax,
                                totalWithTax: totalPriceWithTax
                            },

                            items: cartData,

                            table: customerData.table.tableId,

                            paymentMethod: paymentMethod,

                            paymentData: {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id
                            }
                        }

                        setTimeout(() => {
                            // CALL THE API
                            orderMutation.mutate(orderData)
                        }, 1000)
                    },

                    prefill: {
                        name: customerData.customerName,
                        email: "",
                        contact: customerData.customerPhone,
                    },

                    theme: {
                        color: "#025cca"
                    }
                }

                // OPEN THE POP-UP INTERFACE OF RAZORPAY
                const rzp = new window.Razorpay(options)
                rzp.open()

            } 
            catch (error) {
                console.log("ERROR", error) 
                enqueueSnackbar("Payment failed", {variant: "error"})
            }
        }
        else{
            // Place the order
            const orderData = {
                
                customerDetails: {
                    name: customerData.customerName,
                    phone: customerData.customerPhone,
                    guests: customerData.guests
                },

                orderStatus : "In Progress",

                bills : {
                    total: total,
                    tax: tax,
                    totalWithTax: totalPriceWithTax
                },

                items: cartData,

                table: customerData.table.tableId,

                paymentMethod: paymentMethod
            }
            orderMutation.mutate(orderData)
        }
    }

    // CREATE AN ORDER MUTATION TO CALL ORDER API
    const orderMutation = useMutation({
        mutationFn: (reqData) => {
            return addOrder(reqData)
        },

        onSuccess: (resData) => {
            const {data} = resData.data
            // console.log("resData:", data)
            // console.log("TABLE ID SENT:", data.table)

            // STORE ORDER DATA TO BE SENT TO invoice.jsx
            setOrderInfo(data)

            // OPEN MODAL
            setShowInvoice(true)

            // WHEN THE ORDER IS PLACED, UPDATE THE table
            const tableData = {
                tableId: data.table,
                status: "Booked",
                orderId: data._id
            }

            // UPDATE TABLE VIA react query mutation
            setTimeout(() => {
                
                tableUpdaeMutation.mutate(tableData)
            }, 1000)

            enqueueSnackbar("Order Placed", {variant: "success"})
        },

        onError: (error) => {
            console.log(error)
            enqueueSnackbar("Couldn't Place Order", {variant: "error"})

        }
    })

    
    const tableUpdaeMutation = useMutation({

        mutationFn: ({ tableId, ...tableData }) => {
            return updateTable(tableId, tableData)
        },

        onSuccess: (resData) => {
            console.log(resData)

            dispatch(removeCustomer())
            dispatch(removeAllItems())

            enqueueSnackbar("Table booked", { variant: "info" })

        },

        onError: (error) => {
            console.log(error?.response?.data || error)
            enqueueSnackbar("Table booking failed", { variant: "warning" })
        }
    })


    return (
        <>
            {/* total calculation */}
            <div className='flex items-center justify-between px-5 mt-1'>
                
                <p className='text-[#ababab] text-xs font-medium mt-2'>Items({cartData.length})</p>
                <h1 className='text-[#f5f5f5] text-sm font-bold'>₹{total.toFixed(2)}</h1>
            </div>

            <div className='flex items-center justify-between px-5'>
                
                <p className='text-[#ababab] text-xs font-medium mt-1'>Tax(5.00%)</p>
                <h1 className='text-[#f5f5f5] text-sm font-bold'>₹{tax.toFixed(2)}</h1>
            </div>

            <div className='flex items-center justify-between px-5 mt-2'>
                
                <p className='text-[#ababab] text-sm font-medium mt-2'>Total</p>
                <h1 className='text-[#f5f5f5] text-md font-bold'>₹{totalPriceWithTax.toFixed(2)}</h1>
            </div>

            {/* billing methods and order placing */}
            <div className='flex items-center gap-4 px-3 mt-4'>
                <button
                    onClick={() => setPaymentMethod("Cash")}
                    className={`text-[#d2d2d2] bg-[#1f1f1f] text-md py-2 w-full cursor-pointer rounded-lg font-semibold ${paymentMethod === "Cash" ? "bg-[#383737] text-white" : ""}`}
                >
                    Cash 
                </button>

                <button
                    onClick={() => setPaymentMethod("Online")}
                    className={`text-[#d2d2d2] bg-[#1f1f1f] text-md py-2 w-full cursor-pointer rounded-lg font-semibold ${paymentMethod === "Online" ? "bg-[#383737] text-white" : ""}`}
                >
                    Online
                </button>
            </div>

            {/* <div className='flex items-center gap-4 px-3 mt-2'> */}
            <div className='flex items-center gap-4 px-3 mt-3'>

                {/* <button
                    className='text-[#ebe6e6] bg-[#025cca] text-lg py-2 cursor-pointer w-full rounded-lg font-semibold'
                >
                    Print Receipt 
                </button> */}

                <button
                    onClick={handlePlaceOrder}
                    className='text-[#1f1f1f] bg-[#f6b100] text-lg py-2 cursor-pointer w-full rounded-lg font-semibold'
                >
                    Place Order 
                </button>
            </div>

            {
                showInvoice && <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
            }
        </>
    )   
}

export default BillsInfo