const Group = require("../models/group.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Group content can't be empty"
    });
  }
  const group = new Group({
    group_name: req.body.group_name.toLowerCase(),
    display_name: req.body.display_name,
    role: req.body.role.toLowerCase()
  });

  group
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
  Group.find({})
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
  if (!req.params.group_name) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  Group.find({ group_name: req.params.group_name.toLowerCase() })
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
  if (!req.params.group_name) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  Group.updateOne({ group_name: req.params.group_name.toLowerCase() }, req.body)
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
  if (!req.params.group_name) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  Group.deleteOne({ group_name: req.params.group_name.toLowerCase() })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};
