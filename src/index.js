const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 8080

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database. Exiting now.', err)
    process.exit()
})



app.get('/', (req, res) => res.send(`Hello!`))

require('./routes/user.routes')(app)
require('./routes/group.routes')(app)
require('./routes/customer.routes')(app)
require('./routes/cluster.routes')(app)

app.listen(port, () => console.log(`App listening on port ${port}`))
