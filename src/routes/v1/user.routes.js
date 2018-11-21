const prefix = require("./prefix");
module.exports = app => {
  const users = require("../../controllers/v1/user.controller.js");

  app.post(`${prefix}/users`, users.create);

  app.get(`${prefix}/users`, users.findAll);

  app.get(`${prefix}/users/:user_name`, users.findOne);

  app.put(`${prefix}/users/:user_name`, users.update);

  app.delete(`${prefix}/users/:user_name`, users.delete);
};
