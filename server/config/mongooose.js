const mongoose = require("mongoose");
const path     = require("path");
const fs = require("fs");
const models = path.join(__dirname, "../models");



/* connect (if not create a new) to our DATABASE */
mongoose.connect('mongodb://test:test12345@ds117773.mlab.com:17773/todo-app', { useNewUrlParser: true })


/* Loading the Schema "Model" avalilables in the models folder */ 
fs.readdirSync(models).forEach(function (file) {
    //console.log('From Moongose.js --> Model Loaded: ' + file);
    if (file.indexOf(".js") >= 0) {
		require( models+"/"+file );
	}	
});

 