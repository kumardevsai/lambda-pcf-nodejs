'use strict';

var express = require('express'),
	path = require('path'),
	config = require('./config'),
	winston = require('./winston'),
	compression = require('compression'),
	bodyParser = require('body-parser')
	//,logger = require('morgan')
	;

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
	
	//Setting the fav icon and static folder
	//app.use(favicon(config.root + '/public/img/icons/favicon.ico'));
	app.use(express.static(config.root + '/public'));
	
	//Don't use logger for test env
	/*if (config.NODE_ENV !== 'test') {
		app.use(logger('dev', { "stream": winston.stream }));
	}*/
	
	//Enable jsonp
	// app.enable("jsonp callback");
	
	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
	  require(path.resolve(routePath))(app);
	});

   /* app.get('*',  function (req, res, next) {
        //res.render('index');
    	//res.send('hello world');
	});
	
	app.use('*',function(req, res){
	    res.status(404).render('404', {
	        url: req.originalUrl,
	        error: 'Not found'
	    });
	});
	
	app.use(function(err, req, res, next) {
	
	    //Log it
	    winston.error(err);
	
	    //Error page
	    res.status(500).render('500', {
	        error: err.stack
	    });
	});*/
};