const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL:{
        type: String,
        default: function(){
            return gravatar.url(this.email,{} ,true)
        }
    }
})

const schemaRegister = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
})

const schemaLogin = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
})

const User = model('user', schema);

module.exports = {User, schemaRegister, schemaLogin}