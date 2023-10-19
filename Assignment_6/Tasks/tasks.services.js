const TaskModel = require("../models/activities")

async function getTask(id){
    const todo = await TaskModel.find({
        user_id : id
    })

    // console.log(todo)
    // const userTodo = await TaskModel.aggregate([{
    //     $lookup :{
    //         from: "users" , 
    //         localField: "user_id", 
    //         foreignField : "_id", 
    //         as : "user"
    //     }
    // }])
    // return userTodo

    return todo
}


module.exports = {
    getTask
}