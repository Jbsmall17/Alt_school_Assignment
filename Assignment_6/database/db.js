const mongoose = require("mongoose");
require("dotenv").config()

const MONGO_URL = process.env.MONGO_URL

function connectToDb(){
    mongoose.connect(MONGO_URL);

    mongoose.connection.on("connected",()=>{
        console.log("connected to mongodb successfully")
    })

    mongoose.connection.on("error",()=>{
        console.log("unable to connect to mongodb")
    })
}

module.exports = {
    connectToDb
}