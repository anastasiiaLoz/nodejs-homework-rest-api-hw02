const { NotFound } = require("http-errors");
const { ContactModel } = require("../../model/contact.model");

class ContactsService {
  async getContacts() {
    return ContactModel.find();
  }

  async getContact(id) {
    const contact = await ContactModel.findById(id);
    if (!contact) {
      throw new NotFound("Not Found");
    }
    return contact;
  }

  async createContact(createParams) {
    const contact = await ContactModel.create(createParams);
    return contact;
  }

  async deleteContact(id) {
    const contact = await ContactModel.findByIdAndDelete(id);
    if (!contact) {
      throw new NotFound("Not found");
    }
    return contact;
  }

  async updateContact(id, updateParams) {
    const contact = await ContactModel.findByIdAndUpdate(id, updateParams, {
      new: true
    });
    if (!contact) {
      throw new NotFound("Not found");
    }
    return contact;
  }

  async updateStatusContact(id, body) {
    const contact = await ContactModel.findByIdAndUpdate(id, body, {
      new: true
    });
    if (!contact) {
      throw new NotFound("Not found");
    }
    return contact;
  }
}

exports.contactsService = new ContactsService();
