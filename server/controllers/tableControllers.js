const createHttpError = require("http-errors")
const Table = require("../models/tableModel.js")
const mongoose = require("mongoose")


const addTable = async (req, res, next) => {

    try {
        const {tableNo, seats} = req.body

        // CHECK IF tableNo ALREADY EXISTS OR NOT
        const isTablePresent = await Table.findOne( {tableNo} )
        if(isTablePresent){
            const error = createHttpError(400, "Table already exist")
            return next(error)
        }

        // SAVE INTO DATABASE
        const newTable = await Table.create({
            tableNo,
            seats
        })

        res.status(201).json({
            success : true,
            message : "Table Added Successfully",
            data : newTable
        })
    } 
    catch (error) {
        next(error)   
    }
}

const getAllTables = async (req, res, next) => {

    try {
        const tables = await Table.find().populate({
            path : "currentOrder",
            select : "customerDetails"
        })

        res.status(200).json({
            success : true,
            total : tables.length,
            data : tables
        })
    } 
    catch (error) {
        next(error)   
    }
}

const updateTable = async (req, res, next) => {
    // ONCE THE ORDER IS PLACED, CHANGE THE STATUS OF THE TABLE FORM "Available" TO "Booked"
    // and to store the order id as well
    try {
        
        const {status, orderId} = req.body

        if(!status || !orderId){
            const error = createHttpError(400, "All feilds are required")
            return next(error)
        }

        const ID = req.params.id
        // if(! mongoose.Types.ObjectId.isValid(ID)){
        //     // means ID is not valid
        //     const error = createHttpError(404, "Invalid ID")
        //     return next(error)
        // }

        const table = await Table.findByIdAndUpdate(
            ID,  // fetch the ID from URL
            {status, currentOrder : orderId},   // field to be updated
            {new : true}
        )

        if(!table){
            const error = createHttpError(404, "Table not found")
            return next(error)
        }

        res.status(200).json({
            success : true,
            message : "Table updated successfully",
            data : table
        })
    } 
    catch (error) {
        next(error)   
    }
}




module.exports = {addTable, getAllTables, updateTable}