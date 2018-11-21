const prefix = require("./prefix");
module.exports = app => {
  const clusters = require("../../controllers/v1/cluster.controller.js");

  app.post(`${prefix}/clusters`, clusters.create);

  app.get(`${prefix}/clusters`, clusters.findAll);

  app.get(`${prefix}/clusters/:env_id`, clusters.findOne);

  app.put(`${prefix}/clusters/:env_id`, clusters.update);

  app.delete(`${prefix}/clusters/:env_id`, clusters.delete);
};
