const HTTP = require('http')
const fs = require('fs')
const path = require('path')

const port = 3000
const hostname = 'localhost'
const errorPageFilePath = path.join(__dirname,'pages',"404.html") 
const studentPageFilePath = path.join(__dirname,"pages","index.html")


function requestHandler(req,res){
    console.log({url:req.url,method: req.method})
    if(req.url === '/index.html'){
        const file = fs.readFileSync(studentPageFilePath)
        res.setHeader('content-type','text/html')
        res.writeHead(200)
        res.end(file)
    }
    else{
        const file = fs.readFileSync(errorPageFilePath)
        res.setHeader('content-type','text/html')
        res.writeHead(404)
        res.end(file)
    }
}

const server = HTTP.createServer(requestHandler)

server.listen(port,hostname,()=>{
    console.log(`server running on http://${hostname}:${port}`)
})