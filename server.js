// const mongoose = require('mongoose')
const express           = require('express')
const path              = require('path')
const bodyParser        = require('body-parser')
const favicon           = require('express-favicon')
const app               = express()
const PORT              = 5000
const mongooseConnector = require('./server/config/mongoose');

/* Templating engine, views and static files  */
// Middleware for forms
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/client/public/assets')))
app.use(favicon(path.join(__dirname, '/client/public/assets/favicon.png')))
app.set('views', path.join(__dirname, '/client/public/views'))

//mongoose connection
mongooseConnector.mongooseConnection()
  .then(res => {
    console.log('Connected to DB \n');
    // seedDB()
  })
  .catch(err => {
    console.log(err)
    console.log('ERROR in DB connection', err.message);
  });

require('./server/config/routes')(app)
/* imports mongoose from the mongoose.js */

/* Server */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
