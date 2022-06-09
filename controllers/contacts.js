const contacts = require('../services/contact.service');
const {createErrors} = require('../errors');

const listContacts = async(req, res, next) =>{
    try {
        const all = await contacts.listContacts();
        res.json(all);
    } catch (error){ 
        next(error);
    };
};

const getContactById = async (req, res, next) => {
    try { 
        const{contactId} = req.params;
        const contact = await contacts.getContactById(contactId);
        if (!contact) {
            res.status(404).json({ "massage": "Not found" });
        } else {
            res.json(contact);
        }
    } catch (error) {
        next(error);
    };
};

const addContact = async(req,res,next)=>{
    //console.log(req.body);
    
    try { 
        const contact = await contacts.addContact(req.body);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    };
};

const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contacts.updateContact(contactId, req.body);
        if (!contact) {
            res.status(404).json({ "massage": "Not Found" });
        } else {
            res.json(contact);
        }
    } catch (error) {
        next();
    };
};

const updateFavorite = async (req, res, next) => {
    //console.log('in PATCH')
    try {
        const { favorite } = req.body;
        const { contactId } = req.params;
        const contact = await contacts.updateContact(contactId, req.body);
        if (!contact) {
            res.status(404).json({ "massage": "Not Found" });
        } else {
            res.json(contact);
        }
    } catch (error) {
        next();
    }
}

const removeContact = async (req, res, next) => {
    console.log('in DELETE')
    try { 
        const { contactId } = req.params;
        const contact = await contacts.removeContact(contactId);
        if (!contact) {
            res.status(404).json({ "massage": "Not Found" })
        } else {
            res.json({ "massage": "contact deleted" });
        }
    } catch (error) {
        next(error);
    };
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateFavorite,
}