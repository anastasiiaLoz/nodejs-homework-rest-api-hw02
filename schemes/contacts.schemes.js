const Joi = require("joi");

exports.createContactSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string().required()
});

exports.updateContactSchema = Joi.object({
  name: Joi.string().min(4),
  email: Joi.string().email(),
  phone: Joi.string()
}).min(1);
