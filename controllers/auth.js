const authService = require('../services/auth.service')

const registerUser = async (req, res, next) =>{
    try{
        const user = await authService.registerUser(req.body);

        res.json({
            email: user.email,
            subscription: user.subscription,
        })
    }catch(e){
        next (e)
    }
}

const loginUser = async (req, res, next) => {
    try{
        const token = await authService.loginUser(req.body);
        res.json(token);
    } catch (e){
        next(e)
    }
}

module.exports = {registerUser, loginUser}