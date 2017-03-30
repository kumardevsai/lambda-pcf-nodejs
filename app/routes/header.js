'use strict';

var util = require('../../config/utility'),
		winston = require('../../config/winston'),
		//member = require('../controllers/user'),
		assert = require('assert');

module.exports = function(app) {

	// Check headers
	/*app.all('*',  function (req, res, next) {
		//allow certain requests to pass
		if(req.method === 'POST' && (req.path === '/member' || req.path === '/login')){
			try{
				assert.ok(req.body !== undefined && req.body !== null);
			}catch(ex){
				 return res.status(400).json(util.handleErr('MissingBodyInfo'));
			}

			return next();//it's a new member signup
		}

		//default to require a login header
		var apiKey = req.headers.fightapp;

		try{
			assert.ok(apiKey !== undefined && apiKey !== null);
		}catch(ex){
			 next();//NEED TO FIX THIS!!!!!
			 return;
			 //return res.status(400).json(util.handleErr('MissingHeader'));
		}

	});*/
};