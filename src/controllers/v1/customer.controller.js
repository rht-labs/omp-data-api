const Customer = require("../../models/v1/customer.model.js");

exports.create = (req, res) => {
  // Set defaults
  const customer = new Customer({
    customer_name: req.body.customer_name,
    tags: req.body.tags
  });
  customer
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occurred."
      });
    });
};

exports.findAll = (req, res) => {
  Customer.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occurred."
      });
    });
};

exports.find = (req, res) => {
  if (!req.params.tags) {
    res.status(400).send({
      message: "You must provide a tags parameter."
    });
    return;
  }
  Customer.find({
      tags: {$all: req.params.tags.split(',')}
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occurred."
      });
    });
};

exports.update = (req, res) => {
  if (!req.params.tags) {
    res.status(400).send({
      message: "You must provide a tags parameter."
    });
    return;
  }
  Customer.updateMany({
        tags: {$all: req.params.tags.split(',')}
      },
      req.body
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occurred."
      });
    });
};

exports.delete = (req, res) => {
  if (!req.params.tags) {
    res.status(400).send({
      message: "You must provide a tags parameter."
    });
    return;
  }
  Customer.deleteMany({
      tags: {$all: req.params.tags.split(',')}
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occurred."
      });
    });
};