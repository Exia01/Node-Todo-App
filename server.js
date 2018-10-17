// const mongooose = require('mongooose')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const app = express();
const PORT = 8000;


/* Templating engine, views and static files  */
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/client/public/views'));
app.use(express.static(path.join(__dirname, 'client/public/static/css')));
app.use(express.static(path.join(__dirname, 'client/public/static/imgs')));
app.use(express.static(path.join(__dirname, 'client/public/static/js')));
app.use(favicon(path.join(__dirname + '/client/public/static/favicon.png')));

/* Middleware for forms */

/* Importing the routes as a controller,passing in express "app" */
// require("./server/config/mongooose.js");
require("./server/config/mongooose.js");
require('./server/config/routes')(app);
/* imports mongoose from the mongoose.js */




/* Server */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});