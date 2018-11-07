module.exports = app => {
  const clusters = require("../controllers/cluster.controller.js");

  app.post("/clusters", clusters.create);

  app.get("/clusters", clusters.findAll);

  app.get("/clusters/:env_id", clusters.findOne);

  app.put("/clusters/:env_id", clusters.update);

  app.delete("/clusters/:env_id", clusters.delete);
};
