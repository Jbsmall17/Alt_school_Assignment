const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const db = require('./database/db')
const jwt = require("jsonwebtoken")
const userRouter = require("./Users/users.router")
const taskRouter = require("./Tasks/tasks.router")
const getTask = require("./Tasks/tasks.services")
require('dotenv').config()

const PORT = process.env.PORT || 4000;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set('views', 'views');
app.set('view engine', 'ejs')
app.use(cookieparser())

db.connectToDb()


app.use("/users", userRouter)
app.use("/tasks", taskRouter)

app.get("/",async(req,res)=>{
    res.render("signup")
})

app.get("/login",async(req,res)=>{
    res.render("login")
})

app.use( async(req,res,next)=>{
    const token = req.cookies.jwt
    if (token) {
        try {
            const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = decodedValue
            next()
        } catch (error) {
            res.redirect('login')
        }
    } else {
        res.redirect('login')
    }
})

app.get("/home",async(req,res)=>{
    // console.log(res.locals.user)
    res.render("home", { user: res.locals.user })
})

app.get("/todo",async(req,res)=>{
    const id = res.locals.user._id
    const todolist = await getTask.getTask(id)
    // console.log(todolist)
    res.render("todo", {todos : todolist})
})

app.get("/createtodo",async(req,res)=>{
    res.render("createtodo")
})

app.get("/updatetodo",async(req,res)=>{
    res.render("updatetodo")
})

app.get("/deletetodo",async(req,res)=>{
    res.render("deletetodo")
})

app.get("/logout",async(req,res)=>{
    res.clearCookie('jwt')
    res.redirect('login')
})
// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error occured'
    })
})

app.listen(PORT, (req,res)=>{
    console.log(`localhost:${PORT}`)
})