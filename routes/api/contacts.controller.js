const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/async-wrapper");
const {
  updateContactSchema,
  createContactSchema,
  idValidationSchema,
  updateStatusContactSchema
} = require("../../schemes/contacts.schemes.js");
const { validateCreate, validateUpdate, validateStatus, validateId } = require("../../validation/contacts.validation.js");
const { contactsService } = require("./contacts.service");

router.get(
  "/",
  asyncWrapper(async (req, res, next) => {
    const contacts = await contactsService.getContacts();
    return res.status(200).send(contacts);
  })
);

router.get(
  "/:id",
  validateId(idValidationSchema, "params"),
  asyncWrapper(async (req, res, next) => {
    const contact = await contactsService.getContact(req.params.id);
    return res.status(200).send(contact);
  })
);

router.post(
  "/",
  validateCreate(createContactSchema),
  asyncWrapper(async (req, res, next) => {
    const contact = await contactsService.createContact(req.body);
    return res.status(201).send(contact);
  })
);

router.delete(
  "/:id",
  validateId(idValidationSchema, "params"),
  asyncWrapper(async (req, res, next) => {
    await contactsService.deleteContact(req.params.id);
    return res.status(200).json({ message: "Contact deleted" });
  })
);

router.patch(
  "/:id",
  validateId(idValidationSchema, "params"),
  validateUpdate(updateContactSchema),
  asyncWrapper(async (req, res, next) => {
    const contact = await contactsService.updateContact(req.params.id, req.body);
    return res.status(200).send(contact);
  })
);

router.patch(
  "/:id/favorite",
  validateId(idValidationSchema, "params"),
  validateStatus(updateStatusContactSchema),
  asyncWrapper(async (req, res, next) => {
    const contact = await contactsService.updateStatusContact(req.params.id, req.body);
    return res.status(200).send(contact);
  })
);

module.exports = router;
