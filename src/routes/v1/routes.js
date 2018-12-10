const objects = require("../../controllers/v1/controller.js");
const validator = require('express-joi-validation')({})

const prefix = "/api/v1";

module.exports = app => {

  app.post(`${prefix}/:objType`, (req, res, next) => validator.body(objects.models[req.params.objType].validator)(req, res, next), objects.create);

  app.get(`${prefix}/:objType`, objects.findAll);

  app.get(`${prefix}/:objType/:tags`, objects.find);

  app.put(`${prefix}/:objType/:tags`, objects.update);

  app.delete(`${prefix}/:objType/:tags`, objects.delete);

};