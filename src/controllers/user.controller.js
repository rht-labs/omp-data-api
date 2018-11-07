const User = require("../models/user.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "User content can't be empty"
    });
  }
  const user = new User({
    user_name: req.body.user_name.toLowerCase(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    expiration_date: req.body.expiration_date,
    email: req.body.email.toLowerCase(),
    role: req.body.role.toLowerCase(),
    identity_providers: req.body.identity_providers,
    groups: req.body.groups,
    customers: req.body.customers
  });

  user
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
  User.find({})
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
  if (!req.params.user_name) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  User.find({ user_name: req.params.user_name.toLowerCase() })
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
  if (!req.params.user_name) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  User.updateOne({ user_name: req.params.user_name.toLowerCase() }, req.body)
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
  if (!req.params.user_name) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  User.deleteOne({ user_name: req.params.user_name.toLowerCase() })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};
