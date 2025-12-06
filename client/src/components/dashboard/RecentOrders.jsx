import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react"
import {GrUpdate} from 'react-icons/gr'
import { getAllOrder, updateOrderStatus } from "../../https";
import { enqueueSnackbar } from "notistack";
import { formatDateAndTime } from "../../utils";

const orders = [
  {
    id: "101",
    customer: "Amrit Raj",
    status: "Ready",
    dateTime: "January 18, 2025 08:32 PM",
    items: 8,
    tableNo: 3,
    total: 250.0,
  },
  {
    id: "102",
    customer: "John Doe",
    status: "In Progress",
    dateTime: "January 18, 2025 08:45 PM",
    items: 5,
    tableNo: 4,
    total: 180.0,
  },
  {
    id: "103",
    customer: "Emma Smith",
    status: "Ready",
    dateTime: "January 18, 2025 09:00 PM",
    items: 3,
    tableNo: 5,
    total: 120.0,
  },
  {
    id: "104",
    customer: "Chris Brown",
    status: "In Progress",
    dateTime: "January 18, 2025 09:15 PM",
    items: 6,
    tableNo: 6,
    total: 220.0,
  },
]

const RecentOrders = () => {

    const queryClient = useQueryClient()

   const handleStatusChange = ({orderId, orderStatus}) => {

        orderUpdateStatusMutation.mutate({orderId, orderStatus})
    }

    const orderUpdateStatusMutation = useMutation({
        mutationFn : ({orderId, orderStatus}) => {
            return updateOrderStatus({orderId, orderStatus})
        },

        onSuccess: (resData) => {
            enqueueSnackbar("Order status updated successfully", {variant : "success"})

            queryClient.invalidateQueries(["orders"])   // refreshes order data
        },

        onError: (error) => {
            enqueueSnackbar("Failed to update order status", {variant : "error"})
        }
    })

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


    return (
        <>
        <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
            <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
            Recent Orders
            </h2>
            <div className="overflow-x-auto">
            <table className="w-full text-left text-[#f5f5f5]">
                <thead className="bg-[#333] text-[#ababab]">
                <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Table No</th>
                    <th className="p-3">Total</th>
                    <th className="p-3 text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {resData?.data?.data.map((order, index) => (
                    <tr
                    key={index}
                    className="border-b border-gray-600 hover:bg-[#333]"
                    >
                    <td className="p-4"> #{Math.floor(new Date(order.orderDate).getTime())} </td>
                    <td className="p-4">{order.customerDetails?.name}</td>
                    <td className="p-4">
                        <select
                            className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none ${
                                order.orderStatus === "Ready"
                                ? "text-green-500"
                                : "text-yellow-500"
                            }`}
                            value={order.orderStatus}
                            onChange={(e) =>
                                handleStatusChange({orderId: order._id, orderStatus: e.target.value})
                            }
                        >
                            <option className="text-yellow-500" value="In Progress">
                                In Progress
                            </option>
                            <option className="text-green-500" value="Ready">
                                Ready
                            </option>
                        </select>
                    </td>
                    <td className="p-4">{formatDateAndTime(order.orderDate)}</td>
                    <td className="p-4">{order.items.length} Items</td>
                    <td className="p-4">Table : {order?.table?.tableNo}</td>
                    <td className="p-4">₹{order.bills.totalWithTax.toFixed(2)}</td>
                    <td className="p-4 text-center">
                        <button className="text-blue-400 hover:text-blue-500 transition">
                        <GrUpdate size={20} />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </>
    )
}

export default RecentOrders;
