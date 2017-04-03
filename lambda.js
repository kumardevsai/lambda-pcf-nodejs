'use strict';

var util = require('config/utility.js'),
		user = require('app/controllers/user.js');

var actions = {
	init: function(event, context, callback){
		/*var fs = require('fs');
		var config = require('./config/config');
		var winston = require('./config/winston');
		var db = require('./config/sequelize');
		winston.verbose('Initializing application...');
		winston.verbose('Config loaded: '+ config.NODE_ENV);*/

		callback(null,'Success');
	},
	addUser: function(event, context, callback){
		user.add(event,util.salt, callback);
	},
	getUser: function(event, context, callback){
		user.get(event.userId, callback);
	},
	updateUser: function(event, context, callback){
		user.update(event.userId, event, util.salt, callback);
	},
	login: function(event, context, callback){
		user.login(event.email, event.password, util.salt, callback);
	},
	logout: function(event, context, callback){
		user.logout(event.userId,callback);
	}
};

module.exports = actions;