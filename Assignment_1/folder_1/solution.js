const path = require('path')
const process= require('process')
const os = require('os')
// question 1: program to print the current working directory
const cwd = path.resolve()

console.log(cwd)

// quuestion 2: print out seperator of a given file path

const separator = path.sep
console.log(separator)

//question 3: print out extension name of a given file path
const file_path = path.join(__dirname,'folder', 'text.txt')

const extName = path.extname(file_path) 

console.log(extName)

//question 4: print out the process id of the current running process
const processId = process.pid

console.log(processId)

//question 5: print user information of the os

const user = os.userInfo()

console.log(user)

// question 6: printout the platform of an operating system

const platform = os.platform()

console.log(platform)