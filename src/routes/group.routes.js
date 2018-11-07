module.exports = app => {
  const groups = require("../controllers/group.controller.js");

  app.post("/groups", groups.create);

  app.get("/groups", groups.findAll);

  app.get("/groups/:group_name", groups.findOne);

  app.put("/groups/:group_name", groups.update);

  app.delete("/groups/:group_name", groups.delete);
};
