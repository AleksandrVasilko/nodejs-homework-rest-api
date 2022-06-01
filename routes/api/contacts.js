const express = require('express');
const contacts = require('../../models/contacts');
const router = express.Router();


router.use((req,res,next)=>{
  console.log('in products');
  next(); 
})

router.get('/', async (req, res, next) => {
  //res.json({ message: 'template message' })
    try{
    const all = await contacts.listContacts();
    res.json(all);
  } catch(error){
    res.status(500).json({massage: "Internal Server Error"})
  }
})

router.get('/:contactId', async (req, res, next) => {
  //res.json({ message: 'template message' })
  try{
    const{contactId} = req.params;
    const contact = await contacts.getContactById(contactId);
    if(!contact){
      res.status(404).json({"massage": "Not found"});
    } else {
      res.json(contact);
    }
  }catch (error){
    res.status(500).json({massage: "Internal Server Error"})
  }
})

router.post('/', async (req, res, next) => {
  //res.json({ message: 'template message' })
  try{
    const {name, email, phone} = req.body;
    const contact = await contacts.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch{
    res.status(500).json({massage: "Internal Server Error"})
  } 
})

router.delete('/:contactId', async (req, res, next) => {
  //res.json({ message: 'template message' })
  try{
    const{contactId} = req.params;
    const contact = await contacts.removeContact(contactId);
    if(!contact){
      res.status(404).json({"massage": "NotFound"})
    } else {
      res.json({"massage": "contact deleted"});
    }
  } catch(error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.put('/:contactId', async (req, res, next) => {
  //res.json({ message: 'template message' })
  try{
    const {name, email, phone} = req.body;
    const {contactId} =req.params;
    const contact = await contacts.updateContact(contactId, name, email, phone);
    if(!contact){
      res.status(404).json({"massage" : "Not Found"});
    } else { 
      res.json(contact);
    }
  }catch{
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router
