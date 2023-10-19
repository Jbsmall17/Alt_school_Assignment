const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const shortid = require("shortid");

const Schema = mongoose.Schema

const TaskSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    type: {
        type:String,
        require: true
    },
    status:{
        type: String, 
        enum: ['pending', 'completed'],
        default: "pending" 
    },
    user_id:{
        type: String,
        require : true
    },
    created_at: {
         type: Date, 
         default: new Date() 
        }
})


const TaskModel = mongoose.model("tasks", TaskSchema)

module.exports = TaskModel
