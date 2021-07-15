const express = require("express");
const { updateContactSchema, createContactSchema } = require("../../schemes/contacts.schemes.js");
const router = express.Router();
const contactsController = require("../../model/index.js");
const { validate } = require("../../validation/contacts.validation.js");

router.get("/", (req, res, next) => {
  return res.status(200).send(contactsController.listContacts());
});

router.get("/:contactId", (req, res, next) => {
  return res.status(200).send(contactsController.getContactById(req.params.contactId));
});

router.post("/", validate(createContactSchema), (req, res, next) => {
  return res.status(200).send(contactsController.addContact(req.body));
});

router.delete("/:contactId", (req, res, next) => {
  const removedContact = contactsController.removeContact(req.params.contactId);
  return res.status(200).send(removedContact);
});

router.patch("/:contactId", (req, res, next) => {
  const updatedContact = contactsController.updateContact(req.params.contactId, req.body);
  return res.status(200).send(updatedContact);
});

module.exports = router;
