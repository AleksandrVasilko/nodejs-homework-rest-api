const {createError} = require('../errors');
const {authenticateUser} = require('../services/auth.service');

const auth = async (req,res,next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== "Bearer" || !token){
        next(createError(401));
    }

    const user = await authenticateUser(token);
        if(!user || !user.token) {
            next(createError(401))
        }
        req.user = user;
        next();
}

module.exports = {auth}
