'use strict';

var db = require('../../config/sequelize');
var crypto = require('crypto');

var user = {
	get: function(userId, next) {
		db.user.find({where: {userId: userId}}).then(function(userModel){
			if(userModel === undefined) {
				next(null, null);
			}

			next(null, userModel);
		}).catch(next);
	},
	list: function(next) {
		db.user.findAll().then(function(userModels){
			if(userModels === undefined) {
				next(null, null);
			}

			next(null, userModels);
		}).catch(next);
	},
	add: function(userModel, salt, next) {
		var m = db.user.build(userModel);

		userModel.password = m.encrypt(userModel.password, salt);

		db.user
			.findOrCreate({where: {email: userModel.email}, defaults: userModel})
			.spread(function(result, created) {
					if(created === true){
						next(null, result);
					}else{
						throw new db.Sequelize.ValidationError('EmailExists');
					}
				})
			.catch(next);
	},
	remove: function(userId, next) {
		db.user.destroy({where: {userId: userId}}).then(function(){
			next(null, null);
		}).catch(next);
	},
	update: function(userId, userModel, salt, next) {
		if(userModel.password !== undefined && userModel.password !== null){
			salt = new Buffer(salt, 'base64');
			userModel.password = crypto.pbkdf2Sync(userModel.password, salt, 10000, 64).toString('base64');
		}

		db.user.update(userModel,{where: { userId : userId }}).then(function(){
			next(null, null);
		}).catch(next);
	},
	login: function(email, password, salt, next) {
		db.user.find({where: {email: email}}).then(function(m){
			if(m === undefined || m === null) {
				next(null, null);
			}

			if(m.authenticate(password, salt) === true){
				m.setDataValue('lastLoginDate',new Date().getTime());
				delete m.password;
				next(null, m);
			}else{
				next(null,null);
			}
		}).catch(next);
	},
	logout: function(userId, next) {
		next(null,null);
	}
};

module.exports = user;