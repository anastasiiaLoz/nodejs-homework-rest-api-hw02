const fs = require("fs");
const path = require("path");
const contactsPath = require("./contacts.json");

function listContacts() {
  console.table(contactsPath);
  return contactsPath;
}

function getContactById(contactId) {
  const contactById = contactsPath.find(({ id }) => id === parseInt(contactId));
  console.log(`Here is a contact ${parseInt(contactId)}`);

  return contactById;
}

function addContact({ name, email, phone }) {
  let uniqueId = Math.floor(Math.random() * 100);
  const contactsNew = { id: uniqueId, name, email, phone };
  const contactsList = [...contactsPath, contactsNew];

  console.log(`A new contact '${name}' was added`);
  return contactsList;
}

function removeContact(contactId) {
  const contactList = contactsPath.filter(({ id }) => id !== Number(contactId));
  console.table(contactList);

  console.log(`Contact by ID: '${contactId}' was removed`);
  return contactList;
}

function updateContact(contactId, body) {
  const contactToUpdate = getContactById(contactId);
  const updatedContact = Object.assign(contactToUpdate, body);
  const updatedContactList = contactsPath.filter(({ id }) => id !== Number(contactId));
  updatedContactList.push(updatedContact);

  console.log(`The contact ${contactId} was updated`);

  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
