const prefix = require("./prefix");
const customers = require("../../controllers/v1/customer.controller.js");
const Joi = require('joi')
const validator = require('express-joi-validation')({})

const customerSchema = Joi.object({
  customer_name: Joi.string().min(2).max(50).required(),
  tags: Joi.array().items(Joi.string()) 
})
module.exports = app => {

  app.post(`${prefix}/customers`, validator.body(customerSchema), customers.create);

  app.get(`${prefix}/customers`, customers.findAll);

  app.get(`${prefix}/customers/:tags`, customers.find);

  app.put(`${prefix}/customers/:tags`, customers.update);

  app.delete(`${prefix}/customers/:tags`, customers.delete);
};