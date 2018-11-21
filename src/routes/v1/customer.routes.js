const prefix = require("./prefix");
module.exports = app => {
  const customers = require("../../controllers/v1/customer.controller.js");

  app.post(`${prefix}/customers`, customers.create);

  app.get(`${prefix}/customers`, customers.findAll);

  app.get(`${prefix}/customers/:customer_id`, customers.findOne);

  app.put(`${prefix}/customers/:customer_id`, customers.update);

  app.delete(`${prefix}/customers/:customer_id`, customers.delete);
};
