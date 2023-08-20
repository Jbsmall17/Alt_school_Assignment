const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const fs = require("fs")

const PORT = 4000
const InventoryJson = path.join(__dirname,"db","inventory.json")

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())

app.post('/inventory',(req,res)=>{
    const newProduct = req.body
    fs.readFile(InventoryJson,"utf-8",(err,inventory)=>{
        if(err){
            res.status(404).json({
                data:null,
                error: 'occured while making request'
            })
        }
        const ParsedInventory = JSON.parse(inventory)
        newProduct.id = ParsedInventory.length + 1;
        const newInventory = [...ParsedInventory, newProduct]
            fs.writeFile(InventoryJson,JSON.stringify(newInventory),(err)=>{
                if(err){
                    res.status(500).json(
                        {
                            data:null,
                            message:'Internal Server Error. Could not save Product to database.'
                        })
                }
            })
            res.status(200).send(newProduct)  
    })
})
app.get('/inventory',(req,res)=>{
    fs.readFile(InventoryJson,"utf-8",(err,inventory)=>{
        if(err){
            res.status(404).json({
                data:null,
                error: 'occured while making request'
            })
            return 
        }
        res.status(200).send(inventory)
    })
})
app.get("/inventory/:id",(req,res)=>{
    const id = req.params.id
    console.log(id)
    fs.readFile(InventoryJson,"utf-8",(err,inventory)=>{
        if(err){
            res.status(404).json({
                data:null,
                error: 'occured while making request'
            })
        }
        const ParsedInventory = JSON.parse(inventory);
        const index = ParsedInventory.findIndex(item => item.id == id)
        console.log(index)
        if(index == -1){
            res.status(404).json(
            {
                data:null,
                message:"item not found"
            })
            return
        }
        res.status(200).send(ParsedInventory[index])
    })    
})
app.patch("/inventory/:id",(req,res)=>{
    const id= req.params.id
    const upadetedDetails = req.body
    fs.readFile(InventoryJson,'utf-8',(err,inventory)=>{
        if(err){
            res.status(404).json({
                data:null,
                error: 'occured while making request'
            })
            return
        }
        const ParsedInventory = JSON.parse(inventory);
        const index = ParsedInventory.findIndex(item => item.id == id)
        if(index === -1){
            res.status(404).json(
            {
                data:null,
                message:"item not found"
            })
            return
        }
        const updateProduct = {...ParsedInventory[index],...upadetedDetails}
        ParsedInventory.splice(index,1,updateProduct)
        fs.writeFile(InventoryJson,JSON.stringify(ParsedInventory),(err)=>{
            if(err){
                res.status(500).json(
                    {
                        data:null,
                        message:'Internal Server Error. Could not save Product to database.'
                    })
            }
        })
        res.status(200).send(updateProduct)
    })
})
app.delete("/inventory/:id",(req,res)=>{
    const id = req.params.id;
    fs.readFile(InventoryJson,'utf-8',(err,inventory)=>{
        if(err){
            res.status(404).json({
                data:null,
                error: 'occured while making request'
            })
            return 
        }
        const ParsedInventory = JSON.parse(inventory);
        const index = ParsedInventory.findIndex(item => item.id == id)
        if(index === -1){
            res.status(404).json(
            {
                data:null,
                message:"item not found"
            })
            return 
        }
        const deletedProduct = ParsedInventory.splice(index,1)
        fs.writeFile(InventoryJson,JSON.stringify(ParsedInventory),(err)=>{
            if(err){
                res.status(404).json(
                    {
                        data:null,
                        message:"item not found"
                    })
                    return
            }
            res.status(200).send(deletedProduct)
        })
    })
})
app.listen(PORT,()=>{
    console.log(`server listening on the http://localhost:${PORT}`)
})