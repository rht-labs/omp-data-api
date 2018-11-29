const prefix = require("./prefix");
const users = require("../../controllers/v1/user.controller.js");
const Joi = require('joi')
const validator = require('express-joi-validation')({})

const userSchema = Joi.object({
  user_name: Joi.string().min(2).max(50).required(),
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  expiration_date: Joi.date(),
  email: Joi.string().email().required(),
  identity_providers: Joi.any(),
  tags: Joi.array().items(Joi.string())
})

module.exports = app => {

  app.post(`${prefix}/users`, validator.body(userSchema), users.create);

  app.get(`${prefix}/users`, users.findAll);

  app.get(`${prefix}/users/:tags`, users.find);

  app.put(`${prefix}/users/:tags`, users.update);

  app.delete(`${prefix}/users/:tags`, users.delete);
};