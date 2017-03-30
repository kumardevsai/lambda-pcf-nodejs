'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var fs = require('fs');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load Configurations
var config = require('./config/config');
var winston = require('./config/winston');
var db = require('./config/sequelize');

winston.verbose('Starting application...');
winston.verbose('Config loaded: '+ config.NODE_ENV);
//winston.debug('Accepted Config:',config);


var app = express();

//Initialize Express
require('./config/express')(app);

//Start the app by listening on <port>
app.listen(process.env.PORT || config.PORT);
winston.debug('Express app started on port ' + config.PORT);

//expose app
module.exports = app;