const express = require("express");
const router = express.Router();
const { updateContactSchema, createContactSchema } = require("../../schemes/contacts.schemes.js");
const { validateCreate, validateUpdate } = require("../../validation/contacts.validation.js");
const { contactsService } = require("./contacts.errors");

router.get("/", (req, res, next) => {
  const contacts = contactsService.getContacts();
  return res.status(200).send(contacts);
});

router.get("/:contactId", (req, res, next) => {
  const contact = contactsService.getContact(req.params.contactId);
  return res.status(200).send(contact);
});

router.post("/", validateCreate(createContactSchema), (req, res, next) => {
  const contact = contactsService.createContact(req.body);
  return res.status(201).send(contact);
});

router.delete("/:contactId", (req, res, next) => {
  const contact = contactsService.deleteContact(req.params.contactId);
  return res.status(200).json({ message: "Contact deleted" });
});

router.patch("/:contactId", validateUpdate(updateContactSchema), (req, res, next) => {
  const contact = contactsService.updateContact(req.params.contactId, req.body);
  return res.status(200).send(contact);
});

module.exports = router;
