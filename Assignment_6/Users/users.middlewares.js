const joi = require("joi");

async function validateUserCreation(req,res,next){
    try {
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            phone_number: joi.string().required(),
            gender: joi.string().valid('male', 'female'),
        })

        await schema.validateAsync(req.body, { abortEarly: true })
    
        next()
    }catch(error){
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}

async function validateUserLogin(req,res,next){
    try{
        const schema = new joi.object({
            email: joi.string().email().required(),
            password: joi.string().required(),
        })

        await schema.validateAsync(req.body, {abortEarly: true})
        next()
    }
    catch(error){
        return res.status(422).json({
            message: error.message,
            success: false
        })
    } 
}

module.exports = {
    validateUserCreation,
    validateUserLogin    
}