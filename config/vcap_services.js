// app-bound services environment variables

var get_service = function () {
	if (process.env.VCAP_SERVICES) {
		return JSON.parse(process.env.VCAP_SERVICES);
	}

	throw new Error('VCAP_SERVICES not available');
};
var get_db = function () {
	var svc_info = 	get_service()
	if(svc_info.cleardb[0]){
		return svc_info.cleardb[0];
	}

	throw new Error('db not available');
};
var get_db_credentials = function () {
	var db = 	get_db()
	if(db.credentials){
		return db.credentials;
	}
//JSON.parse(process.env.VCAP_SERVICES).cleardb[0].credentials
	throw new Error('db credentials not available');
};

module.exports = {
  get_db_name: function () {
		return get_db_credentials().name;
  },
	get_db_password: function () {
		return get_db_credentials().password;
  },
	get_db_username: function () {
		return get_db_credentials().username;
  },
	get_db_uri: function () {
		return get_db_credentials().uri;
  },
	get_db_port: function () {
		return get_db_credentials().port;
  }
}