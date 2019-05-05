const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const models = path.join(__dirname, '../models');

/* connect (if not create a new) to our DATABASE */
// mongoose.connect('mongodb://test:test12345@ds117773.mlab.com:17773/todo-app', {
//   useNewUrlParser: true
// })
mongoose
  .connect(
    'mongodb+srv://admin:Password01@main-cluster-hpysy.mongodb.net/test?retryWrites=true',
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log('ERROR', err.message);
  });
  
/* Loading the Schema "Model" available in the models folder */
fs.readdirSync(models).forEach(function(file) {
  // console.log('From Mongoose.js --> Model Loaded: ' + file);
  if (file.indexOf('.js') >= 0) {
    require(models + '/' + file);
  }
});
