'use strict';

var express = require('express'),
	path = require('path'),
	config = require('./config'),
	winston = require('./winston'),
	compression = require('compression'),
	bodyParser = require('body-parser')
	;

function allowCrossDomain(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', false);

  if (req.method === 'OPTIONS') {
    res.send(200);
		return;
  }

	next();
};

module.exports = function (app) {
	winston.verbose('Initializing Express');
	app.set('showStackError', true);
	app.locals.pretty = true;

	//for parsing application/json
	app.use(bodyParser.json());

	//Should be placed before express.static
	app.use(compression({
    filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
	}));

	app.use(allowCrossDomain);

	//Setting the fav icon and static folder
	//app.use(favicon(config.root + '/public/img/icons/favicon.ico'));
	//app.use(express.static(config.root + '/public'));

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
	  require(path.resolve(routePath))(app);
	});
};