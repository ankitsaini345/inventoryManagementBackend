const winston = require("winston");
const mongoose = require("mongoose");
const config = require("../config/config");

module.exports = function () {
  // mongoose.set("useNewUrlParser", true);
  // mongoose.set("useFindAndModify", false);
  // mongoose.set("useCreateIndex", true);

  const dbConnectionString = config.mongo.uriString;

  mongoose
    .connect(dbConnectionString)
    .then(() => winston.info(`Connected to MongoDB.`))
    .catch((err) => winston.error('Failed to Connect to MongoDB. Error:' , err))
};
