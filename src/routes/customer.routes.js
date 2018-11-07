module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  app.post("/customers", customers.create);

  app.get("/customers", customers.findAll);

  app.get("/customers/:customer_id", customers.findOne);

  app.put("/customers/:customer_id", customers.update);

  app.delete("/customers/:customer_id", customers.delete);
};
