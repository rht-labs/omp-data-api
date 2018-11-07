module.exports = app => {
  const users = require("../controllers/user.controller.js");

  app.post("/users", users.create);

  app.get("/users", users.findAll);

  app.get("/users/:user_name", users.findOne);

  app.put("/users/:user_name", users.update);

  app.delete("/users/:user_name", users.delete);
};
