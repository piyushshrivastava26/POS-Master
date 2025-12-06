const createHttpError = require("http-errors")
const User = require("../models/userModel")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async (req, res, next) => {
    
    try {

        const {name, email, phone, password, role} = req.body

        if(!name || !email || !phone || !password || !role){
            const error = createHttpError(400, "All fields are required")
            return next(error)
        }

        const isUserPresent = await User.findOne( {email} )
        if(isUserPresent){
            const error = createHttpError(409, "User already exist")
            return next(error)
        }

        // user is not present, create user object and save into database
        const user = {
            name,
            phone,
            email,
            password,
            role
        }
        const newUser = new User(user)
        await newUser.save()

        // remove password before sending it to the response
        const safeUser = { ...(user._doc || user) }
        delete safeUser.password

        res.status(201).json({
            success : true,
            message : "New user created successfully",
            data : safeUser
        })

    } 
    catch (error) {
        next(error)
    }
}


const login = async (req, res, next) => { 
    try {

        const {email, password} = req.body
        console.log("BODY", req.body)

        
        if(!email || !password){
            const error = createHttpError(400, "All fields are required")
            return next(error)
        }

        // FIND THE USER IN DB
        const isUserPresent = await User.findOne({ email }).select("+password")
        if(!isUserPresent){
            const error = createHttpError(401, "Invalid Credentials")
            return next(error)
        }

        // NOW USER IS PRESENT, MATCH THE PASSWORD
        const verifyPassword = await bcrypt.compare(password, isUserPresent.password)
        if(! verifyPassword){
            const error = createHttpError(401, "Invalid Credentials")
            return next(error)
        }

        // GENERATE A TOKEN
        const accessToken = jwt.sign( {_id : isUserPresent._id}, process.env.JWT_SECRET_KEY, {expiresIn : "1d"})

        // STORE TOKEN INTO COOKIES
        res.cookie("accessToken", accessToken, {
            
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            secure: true
        })


        res.status(200).json({
            success : true,
            message : "User Logged-in Successfully",
            accessToken,
            user: isUserPresent
        })
    } 
    catch (error) {
        console.error("Server Error:", error)

        const customError = createHttpError(500, "Something went wrong on the server")
        next(customError)
    }
}


const getUserData = async (req, res, next) => {
    try {
        
        const user = await User.findById(req.user._id).select("-password").lean()

        if(!user){
            const error = createHttpError(404, "User not found")
            return next(error)
        }

        
        res.status(200).json({

            success : true,
            data : user
        })
    } 
    catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        // res.clearCookie('accessToken')
        res.clearCookie('accessToken', { 
            httpOnly: true,
            sameSite: "none",
            secure: true     
        })

        res.status(200).json({
            success : true,
            message : "Logout Successfully"
        })
    } 
    catch (error) {
        next(error)
    }
}



module.exports = {register, login, getUserData, logout}