'use strict';

var winston = require('winston'),
		config = require('./config');

var loggingLevels = {
    levels: {
    	error: 0,
    	warn: 1,
    	info: 2,
    	verbose: 3,
    	debug: 4
    }
  };

//Make winston aware of these colors
//winston.addColors(loggingLevels.colors);

//create a new logger
var logger = new (winston.Logger)({levels: loggingLevels.levels});

// Handle errors
logger.on('error', function (err) { console.error('Winston error', err); });

logger.add(winston.transports.Console, {
  name:'console debug',
	level: 'debug', //write out error, warn, info, verbose, debug
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: true
});

module.exports = logger;