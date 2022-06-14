const Joi = require('joi');
const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const schema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
  });


const schemaCreate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const schemaPatch = Joi.object({
    favorite: Joi.bool().required(),
});



const Contact = model('contact', schema);

module.exports = { Contact, schemaCreate, schemaPatch };