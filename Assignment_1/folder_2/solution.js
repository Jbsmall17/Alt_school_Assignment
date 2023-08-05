const fs = require('fs')
const path = require('path')

// question1: create directory/folder named: "students"
const folder_path = path.join(__dirname,'Students')

fs.mkdir(folder_path,(err)=>{
    if(err){
        console.log('error occured while creating folder: Student')
        return
    }
    console.log('folder successfully created')
})

// question2: in student directory, create a file named user.js

const userFilePath = path.join(__dirname,'Students','user.js')

fs.open(userFilePath,'w',(err,file)=>{
    if(err){
        console.log('error occured')
        return
    }
    console.log(file)
}) 

// qusetion3: Uodate the Students directory to Names
const newFolderPath = path.join(__dirname,"Names")

fs.rename(folder_path,newFolderPath,(err)=>{
    if(err){
        console.log('erroe occurred')
        return
    }
    console.log('file renamed successfully')
})

//question 4: add my name as contnet to the file user.js

const newUserFIlePath = path.join(__dirname,'Names','user.js')
const content = 'console.log("Alao Abdulmusawwir")'

fs.writeFile(newUserFIlePath,content,(err)=>{
    if(err){
        console.log('error occured')
    }
    console.log('successfully written to a file')
})


// question 5: update the file and add your age, sex, nationality
// and other information of yourself
const newContent = '\nconsole.log({age:21,sex:"Male",nationality:"nigerian",phonenumber:8061403147})'

fs.appendFile(newUserFIlePath,newContent,(err)=>{
    if(err){
        console.log('error occured')
        return
    }
    console.log('successfully appended to a file')
})
// update user.js to your name
const nameUserFIlePath = path.join(__dirname,'Names','jibola.js')

fs.rename(newUserFIlePath,nameUserFIlePath,(err)=>{
    if(err){
        console.log('error occurred')
        return 
    }
    console.log('file renamed succussfully')
})

// read content of jibola.js

fs.readFile(nameUserFIlePath,'utf-8',(err,data)=>{
    if(err){
        console.log("error occurred");
        return
    }
    console.log(data)
})

// program to delete a jibola.js

fs.rm(nameUserFIlePath,(err)=>{
    if(err){
        console.log('error deleting file')
        return
    }
    console.log('deleted successfully')
})


// program to delete directory "Names"
fs.rmdir(newFolderPath,(err)=>{
    if(err){
        console.log('error deleting folder')
        return
    }
    console.log('deleted successfully')
})