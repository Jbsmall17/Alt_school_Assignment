const TaskModel = require("../models/activities")
const jwt = require("jsonwebtoken")

require("dotenv").config()

async function createTask(req,res){
    try {
    const token = req.cookies.jwt
    const decodedValue =  await jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decodedValue)
    const {_id} = decodedValue
    const userBodyRequest = req.body
    userBodyRequest.user_id = _id
    // console.log(userBodyRequest)
    const task = await TaskModel.create({
        type : userBodyRequest.type,
        status : userBodyRequest.status,
        user_id : userBodyRequest.user_id
    })
    // console.log(task)    
    return res.status(201).redirect("/todo")
    
    // .json({
    //     message : "task Created Successfully",
    //     task
    // })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message : "server error",
            data: null
        })
    }
}

async function getTask(req,res){
        // const userTodo = await TaskModel.aggregate([{
        //     $lookup :{
        //         from: "users" , 
        //         localField: "user_id", 
        //         foreignField : "_id", 
        //         as : "user"
        //     }
        // }])
        // console.log(userTodo)
        return res.status(200).redirect("/todo")
        
        // .json({
        //     todolist: userTodo
        // })
}

async function updateTask(req,res){
    try{
    const id = req.body.id;
    const newDetails = req.body;
    const task = await TaskModel.findByIdAndUpdate(id,newDetails, {new : true})
    return res.status(200).redirect("/todo")
    
    // json({
    //     message: "task updated successfully",
    //     task
    // })
    
    }catch(error){
        return res.status(404).json({
            message : "server occurred",
            data: null
        })
    }
} 

async function deleteTask(req,res){
    const id = req.body.id;
    try{
        const taskDeleted = await TaskModel.findByIdAndRemove(id)
        
        return res.status(200).redirect("/todo")
        
        
        // .json({
        //     message : "deleted successfully",
        //     data : taskDeleted
        // })
    }catch(error){
        return res.status(404).send({
            message : "server error occured",
            data: null
        })
    }
}


module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask   
}