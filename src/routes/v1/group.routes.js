const prefix = require("./prefix");
const Joi = require('joi')
const validator = require('express-joi-validation')({})

const groupSchema = Joi.object({
  group_name: Joi.string().min(2).max(50).required(),
  display_name: Joi.string().min(2).max(50).required(),
  role: Joi.string().min(2).max(50).required()
})
const groups = require("../../controllers/v1/group.controller.js");
module.exports = app => {

  app.post(`${prefix}/groups`, validator.body(groupSchema), groups.create);

  app.get(`${prefix}/groups`, groups.findAll);

  app.get(`${prefix}/groups/:group_name`, groups.findOne);

  app.put(`${prefix}/groups/:group_name`, groups.update);

  app.delete(`${prefix}/groups/:group_name`, groups.delete);
};