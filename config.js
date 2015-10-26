var server = "localhost";
var db = "Comments";
var port = 27017;
var connection_string = 'mongodb://' + server + ':' + port + '/' + db;

module.exports.server = server;
module.exports.db = db;
module.exports.port = port;
module.exports.connection_string = connection_string;