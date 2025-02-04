const {User} = require('../models/auth')

const updateUser =async (id, data) => {
    return User.findByIdAndUpdate(id, data, {new: true});
}

const findUser = async (filters) => {
    return User.findOne(filters);
}

module.exports = {
    updateUser,
    findUser,
}