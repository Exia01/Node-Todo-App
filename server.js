// const mongoose = require('mongoose')
const express           = require('express')
const path              = require('path')
const bodyParser        = require('body-parser')
const favicon           = require('express-favicon')
const app               = express()
const PORT              = process.env.PORT || 8000
const mongooseConnector = require('./server/config/mongoose');
const appRoutes         = require('./server/routes/index')


// Middleware for forms
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Templating engine, views and static files 
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

//implementing router
app.use('/', appRoutes);


// Server 
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

