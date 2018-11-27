const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

mongoose.Promise = global.Promise;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

mongoose
  .connect(
    process.env.MONGO_URL, {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now.", err);
    process.exit();
  });

// Health check
app.get("/", (req, res) =>
  res.send({
    OK: true
  })
);

var swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);


// Import v1 routes
require("./routes/v1/user.routes")(app);
require("./routes/v1/group.routes")(app);
require("./routes/v1/customer.routes")(app);
require("./routes/v1/cluster.routes")(app);

app.listen(port, () => console.log(`App listening on port ${port}`));