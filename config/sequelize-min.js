'use strict';

var //fs = require('fs'),
	//path = require('path'),
	Sequelize = require('sequelize'),
	_ = require('lodash'),
	//config = require('./config'),
	//winston = require('./winston'),
    cf_svc = require( './vcap_services'),
	db = {};

//winston.verbose('Initializing Sequelize...');

// create your instance of sequelize
var sequelize =  new Sequelize(cf_svc.get_db_uri(),{
    dialect: 'mariadb',
    pool: { maxIdleTime: 10000, maxConnections: 15, minConnections: 0},
    logging: false
});

var model = sequelize.import('../app/models/user.js');
db[model.name] = model;
/*
// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(config.modelsDir)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    // import model files and save model names
    .forEach(function (file) {
        winston.verbose('Loading model file ' + file);
        var model = sequelize.import(path.join(config.modelsDir, file));
        db[model.name] = model;
    });*/

// invoke associations on each of the models
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
});

// Synchronizing any model changes with database.
// set FORCE_DB_SYNC=true in the environment, or the program parameters to drop the database,
//   and force model changes into it, if required;
// Caution: Do not set FORCE_DB_SYNC to true for every run to avoid losing data with restarts
/*
sequelize
    .sync({
        force: config.FORCE_DB_SYNC,
        logging: config.enableSequelizeLog === true ? winston.verbose : false
    })
    .then(function () {
        winston.verbose("Database " + (config.FORCE_DB_SYNC === true ? "*DROPPED* and " : "") + "synchronized");
    }).catch(function (err) {
        winston.error("An error occurred: ", err);
    });
*/
// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);