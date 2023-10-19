const express = require("express")
const mongoose = require('mongoose');
const UserModel = require("../models/users");
const cookieparser = require("cookie-parser")
const userMiddleware = require("../Users/users.middlewares")
const userController = require("../Users/users.controller")

const userRouter = express.Router()
userRouter.use(cookieparser())

userRouter.post("/register", userMiddleware.validateUserCreation, userController.createUser)

userRouter.post("/login",userMiddleware.validateUserLogin, userController.loginUser)


// userRouter.get("/home", (req,res)=>{
//     res.render("home")
// })

module.exports = userRouter