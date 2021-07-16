const { NotFound, BadRequest } = require("http-errors");
const { listContacts, getContactById, removeContact, addContact, updateContact } = require("../../model/index");

class ContactsService {
  getContacts() {
    return listContacts();
  }

  getContact(id) {
    const contact = getContactById(id);
    if (!contact) {
      throw new NotFound("Not found");
    }
    return contact;
  }

  createContact(createParams) {
    const contact = addContact(createParams);
    return addContact(createParams);
  }

  deleteContact(id) {
    const contact = getContactById(id);
    if (!contact) {
      throw new NotFound("Not found");
    }
    return removeContact(id);
  }

  updateContact(id, updateParams) {
    const contact = getContactById(id);
    if (!contact) {
      throw new NotFound("Not found");
    }
    return updateContact(id, updateParams);
  }
}

exports.contactsService = new ContactsService();
