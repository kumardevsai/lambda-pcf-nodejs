'use strict';

var crypto = require('crypto'),
		Sequelize = require('sequelize'),
		winston = require('./winston');

module.exports = {
	salt: 'th1sIsT5esa&l',
	handleErr: function(err, meta){
		try{
			this.logErr(err);
		}catch(ex){
			this.logErr(new Error('Could handle error (logErr), ' + ex));
		}
		
		return this.formatErr(err,meta);
	},
	formatErr: function (msg, meta) {
  	switch(typeof(msg)){
	  	case('object'):
	  		if(msg instanceof Sequelize.ValidationError){
	  			return {level:'error', type:msg.name, message:msg.message, meta:msg.errors };
  			}else if(msg instanceof Sequelize.DatabaseError){
  				return {level:'error', type:msg.name, message:msg.message, meta:meta };
  			}else if(msg instanceof Sequelize.TimeoutError){
  				return {level:'error', type:msg.name, message:msg.message, meta:meta };
  			}else if(msg instanceof Error){
  				return {level:'error', type:'JavascriptError', message:msg.message, meta:meta };
  			}else{
  				return {level:'error', type:'GeneralError', message:msg, meta:meta  };
  			}
	  	default:
	  		return {level:'error', message:msg, meta:meta };
  	};
  },
  logErr: function(err){
  	switch(typeof(err)){
	  	case('object'):
	  		if(err instanceof Sequelize.ValidationError){
	  			return;
				}else if(err instanceof Sequelize.DatabaseError){
					winston.log('error', err.message, err);
				}else if(err instanceof Sequelize.TimeoutError){
					return;
				}else if(err instanceof Error){
					winston.log('error', err.message, err.stack);
				}else{
					winston.log('error', err.name, err);
				}
	  	case('string'):
	  		break;
	  	default:
	  		winston.error(err);
		};
		
		return;
  }
};