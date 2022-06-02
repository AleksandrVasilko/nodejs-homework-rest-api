const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, 'utf8');
  const data = JSON.parse(dataString);
  return (data);
}

const getContactById = async (contactId) => {
  const type = (typeof contactId)
    const allContacts = await listContacts();
    allContacts.map(contact => {
        const typeId = typeof contact.id
        if(typeId !== type){
            contactId = String(contactId)
        }
    });
    const contact = allContacts.find(contact => contact.id === contactId)
    return contact ? contact : null;
}

const removeContact = async (contactId) => {
  const type = (typeof contactId)
  const allNewContacts = await listContacts();
  allNewContacts.map(contact => {
    const typeId = typeof contact.id
    if(typeId !== type){
        contactId = String(contactId)
    }
  });
  const contactIndex = allNewContacts.findIndex(contact => contact.id === contactId);
    if (contactIndex !== -1) { 
        allNewContacts.splice(contactIndex,1)
        await fs.writeFile(contactsPath, JSON.stringify(allNewContacts));
    }    
    console.log(allNewContacts)
}


const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  }
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  console.log(allContacts)
}

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);

  if(contactIndex !== -1){
    allContacts[contactIndex].name = name;
    allContacts[contactIndex].email = email;
    allContacts[contactIndex].phone = phone;
  
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts[contactIndex];
  } else {
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
