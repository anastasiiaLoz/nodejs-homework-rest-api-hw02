const Joi = require("joi");

exports.signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
});

exports.logInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
});
