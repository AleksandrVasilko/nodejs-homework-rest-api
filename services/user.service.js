const {User} = require('../models/auth')

const updateUser =async (id, data) => {
    return User.findByIdAndUpdate(id, data, {new: true});
}

module.exports = {
    updateUser
}