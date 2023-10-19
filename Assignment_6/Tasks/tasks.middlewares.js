const joi =  require('joi')

async function validateTask(req,res,next){
    try{
        const schema =  joi.object({
            type: joi.string().required(),
            status : joi.string().valid('pending', 'completed') 
        })
        
        await schema.validateAsync(req.body,{ abortEarly: true })
        next()
    }catch(error){
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {
    validateTask
}