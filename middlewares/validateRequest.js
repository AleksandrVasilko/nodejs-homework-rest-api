const{createError} = require('../errors')

const validateRequest = (schema) =>{
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error){
            next(createError(400, 'No available field'))
        }
        next();
    }
}

module.exports = {validateRequest}