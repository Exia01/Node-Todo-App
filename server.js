// const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const favicon = require('express-favicon')
const app = express()
const PORT = 8000

/* Templating engine, views and static files  */
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/client/public/assets/css')))
app.use(express.static(path.join(__dirname, '/client/public/assets/js')))
app.use(express.static(path.join(__dirname, '/client/public/assets/js/lib')))
app.use(express.static(path.join(__dirname, '/client/public/assets/imgs')))
app.use(favicon(path.join(__dirname, '/client/public/assets/favicon.png')))
app.set('views', path.join(__dirname, '/client/public/views'))

/* Middleware for forms */

/* Importing the routes as a controller,passing in express "app" */
// require("./server/config/mongoose.js");
require('./server/config/mongoose.js')
require('./server/config/routes')(app)
/* imports mongoose from the mongoose.js */

/* Server */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
