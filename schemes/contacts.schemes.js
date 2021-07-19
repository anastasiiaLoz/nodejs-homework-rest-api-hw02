const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createContactSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional()
});

exports.updateContactSchema = Joi.object({
  name: Joi.string().min(4),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean()
}).min(1);

exports.updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required()
});

exports.idValidationSchema = Joi.object({
  id: Joi.objectId()
});
