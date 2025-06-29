const bodyValidator = (schema) => {
    return async(req, res, next) => {
        try {
           await schema.validateAsync(req.body,{
                abortEarly: false
            });
            next();
           
        } catch (exception) {
            let messageBag={}
            if(exception.details){
                exception.details.map((val)=>{
                    let key = val.context.label;
                    let msg = val.message
                    messageBag[key]= msg
                   
                })
            }
            next({
                details : messageBag,
                code:400,
                message:"Validation Failed",
                status:"VALIDATION FAILED"
            });
            // res.status(400).json({
                // error:{messageBag},
                // message:"Validation Failed",
                // status:"VALIDATION FAILED",
                // option:null
            // })
        }
    }
}

module.exports = bodyValidator