'use strict';

var util = require('../../config/utility'),
		user = require('../controllers/user'),
		assert = require('assert');

module.exports = function(app) {

	app.route('/users/:userId')
		.all(function(req, res, next) {
			try{
				assert.ok(req.params.userId !== undefined && req.params.userId !== null);
			}catch(ex){
				 return res.status(400).json(util.handleErr('MissingUserId'));
			}

			next();
		})
	  .get(function(req, res) {
	  	user.get(req.params.userId, function(err,result){
				if(err){
					return res.status(500).json(util.handleErr(err));
				}

				return res.json(result === null ? null : result.toJSON(true, true, false));
			});
	  })
	  .delete(function(req,res, next){
	  	user.remove(req.params.userId,function(err,result){
	  		if(err){
	  			return res.status(500).json(util.handleErr(err));
	  		}

	  		return res.json(null);
	  	});
	  })
	  .put(function(req,res, next){
	  	 if(req.body === null || req.body === undefined){
	  		 return res.status(400).json(util.handleErr('MissingUserId'));
	  	 }

	  	 delete req.body.userId;
	  	 delete req.body.failedPasswordCount;
	  	 delete req.body.storageSpaceMb;
	  	 delete req.body.isLocked;
	  	 delete req.body.isActive;
	  	 delete req.body.lastLoginDate;
	  	 delete req.body.agreeToTermsDate;
	  	 delete req.body.lastUpdated;
	  	 delete req.body.timestamp;

	  	 user.update(req.params.userId,req.body,util.salt,function(err,result){
	  		 if(err){
	  			 return res.status(500).json(util.handleErr(err));
	  		 }

	  		 return res.json(null);
	  	 });
	  })
	;

	app.route('/users')
	  .post(function(req,res, next){

	  	user.add(req.body,util.salt,function(err,result){
	  		if(err){
	  			return res.status(500).json(util.handleErr(err));
	  		}

	  		return res.json(result === null ? null : result.toJSON(false, true, false));
	  	});
	  })
  ;

	app.route('/users/login')
		.all(function(req, res, next) {
			try{
				assert.ok(req.params.userId !== undefined && req.params.userId !== null);
			}catch(ex){
				 return res.status(400).json(util.handleErr('MissingUserId'));
			}

			next();
		})
	  .post(function(req,res){
	  	try{
				assert.ok(req.body.email !== undefined && req.body.email !== null);
				assert.ok(req.body.password !== undefined && req.body.password !== null);
			}catch(ex){
				 return res.status(400).json(util.handleErr('MissingEmailPassword'));
			}

	  	user.login(req.body.email,req.body.password,util.salt,function(err,result){
	  		if(err){
	  			return res.status(500).json(util.handleErr(err));
	  		}

	  		return res.json(result === null ? null : result.toJSON(false, true));
	  	});
	  })
	;

	app.route('/users/:userId/logout')
		.all(function(req, res, next) {
			try{
				assert.ok(req.params.userId !== undefined && req.params.userId !== null);
			}catch(ex){
				 return res.status(400).json(util.handleErr('MissingUserId'));
			}

			next();
		})
	  .get(function(req,res){
	  	return res.json(null);
	  })
	;
};