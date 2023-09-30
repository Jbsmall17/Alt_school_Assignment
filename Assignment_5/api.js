const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const fs = require("fs")
const {userRouter} = require("./router/userRouter/users")
const {inventoryRouter} = require('./router/InventoryRouter/inventory')
const {authenticate } = require("./authenticate")
// const { authorizeAdmin, authorizeUser } = require('./router/userRouter/authorize')

const PORT = 4000
// const InventoryJson = path.join(__dirname,"db","inventory.json")

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())

app.use(authenticate)

app.use("/users", userRouter)

app.use("/inventory", inventoryRouter)

app.listen(PORT,()=>{
    console.log(`server listening on the http://localhost:${PORT}`)
})