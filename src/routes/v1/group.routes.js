const prefix = require("./prefix");
module.exports = app => {
  const groups = require("../../controllers/v1/group.controller.js");

  app.post(`${prefix}/groups`, groups.create);

  app.get(`${prefix}/groups`, groups.findAll);

  app.get(`${prefix}/groups/:group_name`, groups.findOne);

  app.put(`${prefix}/groups/:group_name`, groups.update);

  app.delete(`${prefix}/groups/:group_name`, groups.delete);
};
