const {User} = require('../models/auth');
const {createError} = require('../errors');
const {SECRET_KEY} = require('../helpers/env');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async(userData) => {
    const result = await User.findOne({email: userData.email});

    if(result){
        throw createError(409, 'Email in use');
    }

    const password = userData.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({...userData, password: hashedPassword});

    return user;
}

const authenticateUser = async(token) => {
    try {
        const payload = jwt.verify(token, SECRET_KEY);

        const{id} = payload;
        return await User.findById(id);
    } catch (e) {
        return null;
    }
}

const loginUser = async ({email, password}) => {
    const user = await User.findOne({email});
    if (!user){
        throw createError(401, "Email or password is wrong");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid){
        throw createError(401, "Email or password is wrong");
    }
    const payload = {
        id: user._id,
        subscription: user.subscription,
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'});
    await User.findByIdAndUpdate(user._id, {token})
    return{
        token
    }
}

const logoutUser = async (id) => {
    await User.findByIdAndUpdate(id, {token: null})
}


module.exports = {registerUser, authenticateUser, loginUser, logoutUser}