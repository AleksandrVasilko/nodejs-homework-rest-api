const express = require('express');
const router = express.Router();
const createError = require ('../../errors');
const {listContacts, getContactById, removeContact, addContact, updateContact, updateFavorite,} = require('../../controllers/contacts')

const {schemaPatch, schemaCreate} = require('../../models/contact')
const {validateRequest} = require('../../middlewares/validateRequest')


router.use((req,res,next)=>{
  console.log('in CONTACTS');
  next(); 
})

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validateRequest(schemaCreate), addContact);

router.delete('/:contactId', removeContact)

router.put('/:contactId', updateContact);

router.patch('/:contactId/favorite', validateRequest(schemaPatch), updateFavorite);

module.exports = router