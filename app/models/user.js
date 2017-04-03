'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, dataTypes) {

	return sequelize.define('user', {
	  		userId: {
			    type: dataTypes.INTEGER,
			    field: 'id',
			    primaryKey:true,
			    allowNull: false,
			    unique: true,
			    autoIncrement: true
			  },
			  timestamp: {
			    type: dataTypes.DECIMAL(18,0),
			    defaultValue: function(){
			    	return new Date().getTime();
			    },
			    allowNull: false
			  },
			  lastUpdated: {
			    type: dataTypes.DECIMAL(18,0),
			    defaultValue: function(){
			    	return new Date().getTime();
			    },
			    allowNull: false
			  },
			  firstName: {
			    type: dataTypes.STRING(50),
			    allowNull: false,
			    /*validate: {
			    	isAlphanumeric: true,
					}*/
			  },
			  lastName: {
			    type: dataTypes.STRING(50),
			    allowNull: false,
			    /*validate: {
			    	isAlphanumeric: true,
					}*/
			  },
			  email: {
			    type: dataTypes.STRING(200),
			    allowNull: false,
			    unique: true,
			    /*validate: {
			    	isEmail: true,
					}*/
			  },
			  password: {
			    type: dataTypes.STRING(100),
			    allowNull: false
			  },
			  agreeToTermsDate: {
			    type: dataTypes.DECIMAL(18,0),
			    allowNull: false,
			    defaultValue: function(){
			    	return new Date().getTime();
			    }
			  },
			  lastLoginDate: {
			    type: dataTypes.DECIMAL(18,0),
			    allowNull: true
			  },
			  isActive: {
			    type: dataTypes.BOOLEAN,
			    allowNull: false,
			    defaultValue: true
			  },
			  isLocked: {
			    type: dataTypes.BOOLEAN,
			    allowNull: false,
			    defaultValue: false
			  },
			  failedPasswordCount: {
			    type: dataTypes.INTEGER,
			    allowNull: true
			  }
			}, {
			  freezeTableName: true,
			  timestamps: true,
			  createdAt: 'timestamp',
			  updatedAt: 'lastUpdated',
			  instanceMethods: {
					toJSON: function (includePass, includeFailPass) {
						var values = this.get();
						if(values === null){
							return null;
						}

						if(includePass === undefined || includePass !== true){
							delete values.password;
						}
						if(includeFailPass === undefined || includeFailPass !== true){
							delete values.failedPasswordCount;
						}

						return values;
					},
					encrypt: function(password, salt) {
						if (!password || !salt) {
            	return '';
            }
						salt = new Buffer(salt, 'base64');
						return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
					},
					authenticate: function(plainText, salt){
						return this.encrypt(plainText, salt) === this.password;
					}
				}
			});
};
