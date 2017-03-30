'use strict';

var user = require('app/controllers/user.js');

var actions = {
	init: function(event, context, callback){
		var fs = require('fs');
		var config = require('./config/config');
		var winston = require('./config/winston');
		var db = require('./config/sequelize');
		winston.verbose('Initializing application...');
		winston.verbose('Config loaded: '+ config.NODE_ENV);

		callback(null,'Success');
	},
	addUser: function(event, context, callback){
		user.add(event,callback);
	},
	getUser: function(event, context, callback){
		user.get(event.userId, callback);
	},
	updateUser: function(event, context, callback){
		user.update(event.UserId, event, callback);
	}
};

module.exports = actions;