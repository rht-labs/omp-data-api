const Cluster = require("../../models/v1/cluster.model.js");

exports.create = (req, res) => {
  // Set defaults
  if (!req.body.logging) {
    req.body.logging = false
  }
  if (!req.body.metrics) {
    req.body.metrics = false
  }
  if (!req.body.size) {
    req.body.size = 'SMALL'
  }
  if (!req.body.ha) {
    req.body.ha = false
  }
  const cluster = new Cluster({
    logging: req.body.logging,
    metrics: req.body.metrics,
    size: req.body.size,
    ha: req.body.ha,
    ocp_version: req.body.ocp_version,
    hosting_platform: req.body.hosting_platform,
    tags: req.body.tags
  });
  cluster
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
  Cluster.find({})
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
  Cluster.find({
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
  Cluster.updateOne({
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
  Cluster.deleteOne({
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