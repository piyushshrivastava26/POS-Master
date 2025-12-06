const createHttpError = require("http-errors")
const Order = require("../models/orderModel.js")

const addOrder = async (req, res, next) => {
    
    try {
        const order = new Order(req.body)
        await order.save()


        // if (!req.body) {
        //     return next(createHttpError(400, "Request body cannot be empty"));
        // }

        // const {customerDetails, orderStatus, bills, items, table, paymentMethod, paymentData} = req.body

        // if (!customerDetails || !bills || !items || !table ) {
        //     const error = createHttpError(400, "All fields are required")
        //     return next(error);
        // }

        // // ITEM COUNT SHOULD BE > 0
        // if(! Array.isArray(items) || items.length === 0){
        //     const error = createHttpError(400, "Order must contain at least 1 item")
        //     return next(error)
        // }

        // // BILL SHOULD NOT BE ZERO AS WELL
        // if(bills.total <= 0){
        //     const error = createHttpError(400, "Billing amount must be greater than 0")
        //     return next(error)
        // }

        // // SAVE ORDER DATA INTO DATABASE
        // const order = await Order.create({
        //     customerDetails,
        //     orderStatus,
        //     bills,
        //     items,
        //     table,
        //     paymentMethod, 
        //     paymentData
        // })

        res.status(201).json({
            success : true,
            message : "Order Created",
            data : order
        })
    } 
    catch (error) {
        next(error)    
    }
}

const getOrderByID = async (req, res, next) => {
    
    try {
        const ID = req.params.id
        const order = await Order.findById(ID).lean()
        
        // if(! mongoose.Types.ObjectId.isValid(ID)){
        //     // means ID is not valid
        //     const error = createHttpError(404, "Invalid ID")
        //     return next(error)
        // }

        if(!order){
            const error = createHttpError(404, "Order not found")
            return next(error)
        }

        res.status(200).json({
            success : true,
            data : order
        })
    } 
    catch (error) {
        next(error)    
    }
}

const getAllOrders = async (req, res, next) => {
    
    try {
        const orders = await Order.find().sort( {createdAt : -1} ).lean().populate("table")
        
        res.status(200).json({
            success : true,
            total : orders.length,
            data : orders
        })
    } 
    catch (error) {
        next(error)    
    }
}

const updateOrder = async (req, res, next) => {
    // TO UPDATE THE STATUS OF THE ORDER
    try {
        const {orderStatus, orderId} = req.body
        const ID = req.params.id
        
        // if(! mongoose.Types.ObjectId.isValid(ID)){
        //     // means ID is not valid
        //     const error = createHttpError(404, "Invalid ID")
        //     return next(error)
        // }

        // const validStatuses = ["pending", "processing", "completed", "cancelled"];

        // if (!validStatuses.includes(orderStatus)) {
        //     return next(createHttpError(400, "Invalid order status value"));
        // }


        const order = await Order.findByIdAndUpdate(
            ID,
            {orderStatus, currentOrder: orderId},
            {new : true, lean : true}
        )

        if(!order){
            const error = createHttpError(404, "Order not found")
            return next(error)
        }

        res.status(200).json({
            success : true,
            message : "Order status Updated",
            data : order 
        })
    } 
    catch (error) {
        next(error)    
    }
}


module.exports = {addOrder, getOrderByID, getAllOrders, updateOrder}