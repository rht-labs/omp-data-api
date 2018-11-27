const prefix = require("./prefix");
const users = require("../../controllers/v1/user.controller.js");
const Joi = require('joi')
const validator = require('express-joi-validation')({})

const userSchema = Joi.object({
  username: Joi.string().min(2).max(50).required(),
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  expiration_date: Joi.date(),
  email: Joi.string().email().required(),
  role: Joi.string(),
  identity_providers: Joi.array().items(Joi.object().keys({
    provider: Joi.string(),
    created: Joi.boolean(),
    notified: Joi.boolean()
  })),
  groups: Joi.array().items(Joi.string()),
  customers: Joi.array().items(Joi.string())
})

module.exports = app => {

  app.post(`${prefix}/users`, validator.body(userSchema), users.create);

  app.get(`${prefix}/users`, users.findAll);

  app.get(`${prefix}/users/:user_name`, users.findOne);

  app.put(`${prefix}/users/:user_name`, users.update);

  app.delete(`${prefix}/users/:user_name`, users.delete);
};