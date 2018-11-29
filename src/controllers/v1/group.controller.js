const Group = require("../../models/v1/group.model.js");

exports.create = (req, res) => {
  const group = new Group({
    group_name: req.body.group_name.toLowerCase(),
    display_name: req.body.display_name,
    tags: req.body.tags,
  });

  group
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
  Group.find({})
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
  Group.find({
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
      tags: {$all: req.params.tags.split(',')}
    });
    return;
  }
  Group.updateOne({
      group_name: req.params.group_name.toLowerCase()
    }, req.body)
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
  Group.deleteOne({
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