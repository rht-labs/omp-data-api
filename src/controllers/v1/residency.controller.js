const Residency = require("../../models/v1/residency.model.js");

exports.create = (req, res) => {
  // Set defaults

  const residency = new Residency({
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    cluster_ref: req.body.cluster_ref,
    source_control: req.body.source_control,
    name: req.body.name,
    tags: req.body.tags
  });
  residency
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
  Residency.find({})
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
  Residency.find({
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
  Residency.updateOne({
      tags: {$all: req.params.tags.split(',')}
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
  Residency.deleteOne({
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