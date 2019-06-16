const mongoose    = require('mongoose');
const path        = require('path');
const fs          = require('fs');
const models      = path.join(__dirname, '../models');

/* connect (if not create a new) to DATABASE */
const mongooseConnection = async () => {
  await mongoose.connect(`mongodb+srv://admin:WVm6fwYgsLyvOvHl@main-cluster-hpysy.mongodb.net/test?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: 2,
      reconnectInterval: 3000
    },
  );
};

/* Loading the Schema "Model" available in the models folder */
fs.readdirSync(models).forEach(function(file) {
  // console.log('From Mongoose.js --> Model Loaded: ' + file);
  // console.log(file.indexOf(file))
  if (file.indexOf('.js') >= 0) {
    require(models + '/' + file);
  }
});

module.exports = {
  mongooseConnection: mongooseConnection
};
