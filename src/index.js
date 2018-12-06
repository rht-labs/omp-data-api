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
    process.env.DATABASE_CONNECTION_STRING, {
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

// Import v1 routes
require("./routes/v1/routes")(app);

app.listen(port, () => console.log(`App listening on port ${port}`));