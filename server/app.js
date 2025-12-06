require("dotenv").config()
const express = require("express")

const globalErrorHandler = require("./middlewares/globalErrorHandler.js");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const tableRoutes = require("./routes/tableRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");

const createHttpError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors")


const app = express()
connectDB()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
    origin : [
        'https://pos-master-client.onrender.com',
        'http://localhost:5173'
    ],
    credentials : true,
}))



// ROUTES
app.get("/", (req, res) => {
    const err = createHttpError(404, "something went wornggg")
    throw err

    res.json({
        message : "on / route"
    })
})


// Auth Endpoints
app.use("/api/user", userRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/table", tableRoutes)
app.use("/api/payment", paymentRoutes)





// GLOBAL ERROR HANDLER
app.use(globalErrorHandler)


// APP_SERVER
const PORT = process.env.PORT 
app.listen(PORT, ()=>{
    console.log(`pos_server is running at ${PORT} port`)
})