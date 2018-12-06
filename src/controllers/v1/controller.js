const modelPath = "../../models/v1";

exports.models = {
  clusters: require(`${modelPath}/cluster.model.js`),
  customers: require(`${modelPath}/customer.model.js`),
  groups: require(`${modelPath}/group.model.js`),
  residencies: require(`${modelPath}/residency.model.js`),
  users: require(`${modelPath}/user.model.js`)
}

exports.getModel = model => {
  return exports.models[model].model
}

exports.getValidator = model => {
  return exports.models[model].validator
}

exports.getDefaults = model => {
  return exports.models[model].defaults
}

exports.applyMutator = (model, body) => {
  if (exports.models[model].hasOwnProperty("mutator")){
    return exports.models[model].mutator(body)
  } else {
    return body
  }
}

exports.create = (req, res) => {
  // Set defaults
  req.body = Object.assign(exports.getDefaults(req.params.objType), req.body)
  let body = exports.applyMutator(req.params.objType, req.body)
  const obj = exports.getModel(req.params.objType)(body);
  obj
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
  exports.getModel(req.params.objType).find({})
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
  exports.getModel(req.params.objType).find({
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
  exports.getModel(req.params.objType).updateMany({
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
  exports.getModel(req.params.objType).deleteMany({
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