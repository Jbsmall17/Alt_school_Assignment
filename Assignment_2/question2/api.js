const HTTP =    require('http')
const PATH = require('path')
const fs = require('fs')
const PORT = 4000
const HOST_NAME = 'localhost'

const inventoryJsonPath = PATH.join(__dirname,'db','inventory.json')


function requestHandler(req,res){
    if(req.url === "/inventory" && req.method === 'GET'){
        getProducts(req,res)
    }
    else if(req.url === "/inventory" && req.method === 'POST'){
        addProduct(req,res)
    }
    else if(req.url.startsWith("/inventory/") && req.method === 'GET'){
        getProduct(req,res)
    }
    else if(req.url.startsWith("/inventory/") && req.method === 'PATCH'){
        updateProduct(req,res)   
    }
    else if(req.url.startsWith("/inventory/") && req.method === 'DELETE'){
        deleteProduct(req,res)
    }
}
function getProducts(req,res){
    res.writeHead(200)
    fs.readFile(inventoryJsonPath,'utf-8',(err,inventory)=>{
        if(err){
            res.writeHead(404)
            res.end(JSON.stringify({data:null,error: 'data not found'}))
        }
        res.writeHead(200)
        res.end(inventory)
    })
}

function addProduct(req,res){
    const body =[]
    req.on('data',(chunk)=>{
        body.push(chunk)
    })
    req.on('end',()=>{
        const ParsedBody = Buffer.concat(body).toString()
        const newProduct = JSON.parse(ParsedBody)
        fs.readFile(inventoryJsonPath,'utf-8',(err,inventory)=>{
            if(err){
                res.writeHead(404)
                res.end(JSON.stringify({data:null,error: 'occured while making request'}))
            }
            const ParsedInventory = JSON.parse(inventory)
            newProduct.id = ParsedInventory.length + 1
            const newInventory = [...ParsedInventory, newProduct]
            fs.writeFile(inventoryJsonPath,JSON.stringify(newInventory),(err)=>{
                res.writeHead(500)
                res.end('Internal Server Error. Could not save Product to database.')
            })
            res.writeHead(200)
            res.end(JSON.stringify(newInventory))  
        }) 
    })
}

function getProduct(req,res){
    const itemId = req.url.split('/')[2]
    fs.readFile(inventoryJsonPath,'utf-8',(err,inventory)=>{
        if(err){
            res.writeHead(404)
            res.end(JSON.stringify({data:null,error: 'occured while making request'}))
        }
        const ParsedInventory = JSON.parse(inventory)
        const index = ParsedInventory.findIndex((item)=> item.id ==itemId)
        if(index == -1){
            res.writeHead(404);
            res.end("item not found")
        }
        res.writeHead(200);
        res.end(JSON.stringify(ParsedInventory[index]))
    })
}

function updateProduct(req,res){
    const itemId = req.url.split('/')[2]
    const body = []
    req.on('data',(chunk)=>{
        body.push(chunk)
    })
    req.on('end',()=>{
        const Body = Buffer.concat(body).toString()
        const ParsedBody = JSON.parse(Body)
        fs.readFile(inventoryJsonPath,'utf-8',(err,inventory)=>{
            if(err){
                res.writeHead(404)
                res.end(JSON.stringify({data:null,error: 'occured while making request'}))
            }
            const ParsedInventory = JSON.parse(inventory)
            // ParsedBody.id = ParsedInventory.length + 1
            const index = ParsedInventory.findIndex((item)=> item.id ==itemId)
            if(index == -1){
                res.writeHead(404);
                res.end("item not found")
            }
            const UpdatedProduct = { ...ParsedInventory[index], ...ParsedBody}
            ParsedInventory.splice(index,1, UpdatedProduct)
            fs.writeFile(inventoryJsonPath,JSON.stringify(ParsedInventory),(err)=>{
                res.writeHead(500)
                res.end('Internal Server Error. Could not save Product to database.')
            })
            res.writeHead(200)
            res.end(JSON.stringify(UpdatedProduct))
        })
    })

}
function deleteProduct(req,res){
    const itemId = req.url.split('/')[2]
    fs.readFile(inventoryJsonPath,'utf-8',(err,inventory)=>{
        if(err){
            res.writeHead(404)
            res.end(JSON.stringify({data:null,error: 'occured while making request'}))
        }
        const ParsedInventory = JSON.parse(inventory)
        // ParsedBody.id = ParsedInventory.length + 1
        const index = ParsedInventory.findIndex((item)=> item.id ==itemId)
        if(index == -1){
            res.writeHead(404);
            res.end("item not  in the inventory")
        }
        const deletedProduct = ParsedInventory.splice(index,1)
        fs.writeFile(inventoryJsonPath,JSON.stringify(ParsedInventory),(err)=>{
            if(err){
                res.writeHead(500)
                res.end("internal server error")
            }
            res.writeHead(200)
            res.end(JSON.stringify(deletedProduct))
        })
    })
}

const server = HTTP.createServer(requestHandler)

server.listen(PORT,HOST_NAME,()=>{
    console.log(`server is listening at ${HOST_NAME}:${PORT}`)
})