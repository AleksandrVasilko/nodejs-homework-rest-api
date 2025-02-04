const authService = require('../services/auth.service');
const emailService  = require('../services/email.service');
const userService  = require('../services/user.service');

const registerUser = async (req, res, next) =>{
    try{
        const user = await authService.registerUser(req.body);
        await emailService.sendEmail(user.email, user.verificationToken);

        res.json({
            email: user.email,
            subscription: user.subscription,
            id: user._id,
            avatarURL: user.avatarURL,
        })
    }catch(e){
        next (e)
    }
}

const confirm = async (req,res,next) =>{
    try{
       //const user = await authService.registerUser(req.body);

       const {verificationToken} = req.params;
       
        const user = await userService.findUser({ verificationToken });

        if (!user) { 
            throw createError(404, 'User not found');
        }
        
        const result = await userService.updateUser(user._id, { verify: true, verificationToken: null })
        return res.status(200).json({
            code: 200,
            data: result,
        });
       
    }catch(e){
        next(e);
    }

}

const resend = async (req,res,next) =>{
    try{
        
        const {email} = req.body;
        const user  = await userService.findUser({email});

        if (!user){
            throw createError(404, 'User was not found');
        }

        if(!user.verify){
            //?
        }
        await emailService.sendEmail(user.email, user.verificationToken);

        return res.status(200).json({
            code: 200,
            massage: 'check your email'
       });
    }catch(e){
        next(e);
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

const logoutUser = async (req, res, next) => { 
    try {
        await authService.logoutUser(req.user._id);
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    confirm,
    resend
}