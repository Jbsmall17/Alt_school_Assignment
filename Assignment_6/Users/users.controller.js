const userModel = require("../models/users")
const jwt = require("jsonwebtoken");
require("dotenv").config()



async function createUser(req,res){
    try{
        const userBodyRequest = req.body;
        const user = await userModel.findOne({
            email: userBodyRequest.email
        })
        
        if(user){
            return res.status(404).json({
                message: "User Already exist" 
            })
        }

        const createdUser= await userModel.create({
                        name: userBodyRequest.name,
                        password: userBodyRequest.password,
                        email: userBodyRequest.email,
                        phone_number: userBodyRequest.phone_number,
                        gender: userBodyRequest.gender
                    })

        const token = jwt.sign({ email: createdUser.email, _id: createdUser._id},process.env.JWT_SECRET)
        
        // console.log({createdUser,token})
        return res.status(201).redirect("/login")
        
        // .json({
        //     message : "User Created Successfully",
        //     createdUser,
        //     token
        // })
    }
    catch(error){
        return res.status(500).json({
            message : "server error",
            data: null
        })
    }
}

async function loginUser(req,res){
    const userBodyRequest = req.body
    try{
    const user =  await userModel.findOne({
        email : userBodyRequest.email
    })
    if(!user){
        return res.status(404).json({
            message : "user not found",
            success : false
        })
    }

    const  validPassword = await user.isValidPassword(userBodyRequest.password)
    
    if(!validPassword){
        return res.status(422).json({
            massage : "Enter the Username or password is not correct"
        })
    }

    const token = jwt.sign(
        {
        email : user.email,
        _id : user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
    // console.log(token)
    return res.status(200).cookie("jwt", token).redirect("/home")
    
    // .json({
    //     message : "logged in successfully",
    //     token,
    //     user
    // })
    }
    catch(error){
        return res.status(404).json({
            message : "server error occured",
            data: null
        })
    }
}


module.exports = {
    createUser,
    loginUser
}