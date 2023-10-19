const express = require("express")
const cookieparser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const taskMiddleware = require("./tasks.middlewares")
const taskController = require("./tasks.controller")
const TaskModel = require("../models/activities")
const UserModel = require("../models/activities")
const taskRouter = express.Router()

// taskRouter.use( async(req,res,next)=>{
//     const token = req.cookies.jwt
//     console.log(token)
//     if (token) {
//         try {
//             const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);
//             console.log(decodedValue)
//             res.locals.user = decodedValue
//             next()
//         } catch (error) {
//             console.log(error)
//             res.redirect('login')
//         }
//     } else {
//         res.redirect('login')
//     }
// })

//create task

taskRouter.post("/", taskMiddleware.validateTask, taskController.createTask)

// get task

taskRouter.get("/", taskController.getTask)

// update a task 
taskRouter.post("/update", taskController.updateTask)

// taskRouter.get("/update", async(req,res)=>{
//     res.redirect("/todo")
// })
// delete a task

taskRouter.post("/delete", taskController.deleteTask)

module.exports = taskRouter