const prefix = require("./prefix");
const customers = require("../../controllers/v1/customer.controller.js");
const Joi = require('joi')
const validator = require('express-joi-validation')({})

const customerSchema = Joi.object({
  customer_id: Joi.string().min(2).max(50).required(),
  customer_name: Joi.string().min(2).max(50).required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  cluster_url: Joi.string().min(2).max(250).required(),
  atlassian_url: Joi.string().min(2).max(250),
  source_control: Joi.string().min(2).max(250)
})
module.exports = app => {

  app.post(`${prefix}/customers`, validator.body(customerSchema), customers.create);

  app.get(`${prefix}/customers`, customers.findAll);

  app.get(`${prefix}/customers/:customer_id`, customers.findOne);

  app.put(`${prefix}/customers/:customer_id`, customers.update);

  app.delete(`${prefix}/customers/:customer_id`, customers.delete);
};