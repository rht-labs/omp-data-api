const Customer = require("../../models/v1/customer.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Customer content can't be empty"
    });
  }
  const customer = new Customer({
    customer_id: req.body.customer_id.toLowerCase(),
    customer_name: req.body.customer_name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    cluster_url: req.body.cluster_url,
    atlassian_url: req.body.atlassian_url,
    source_control: req.body.source_control
  });

  customer
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
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
        message: err.message || "An error occured."
      });
    });
};

exports.findOne = (req, res) => {
  if (!req.params.customer_id) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  Customer.find({ customer_id: req.params.customer_id.toLowerCase() })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};

exports.update = (req, res) => {
  if (!req.params.customer_id) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  Customer.updateOne(
    { customer_id: req.params.customer_id.toLowerCase() },
    req.body
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};

exports.delete = (req, res) => {
  if (!req.params.customer_id) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  Customer.deleteOne({ customer_id: req.params.customer_id.toLowerCase() })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};
