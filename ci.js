var http = require('http');
var Backbone = require('backbone');
var spawn = require('child_process').spawn;

(function(){
	
	// set root to this (the scope of this module during execution)
	var root = this;
	
	// namespace of greenboard app
	Greenboard = root.Greenboard = {};

	Greenboard.start = function start() {	
		http.createServer(function (req, res) {
			var child = spawn('ps', ['-ef']);
//			var child = spawn('mvn', ['clean', 'install']);
//			var child = spawn('grep', ['-R', 'aperture', '/']);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			child.stdout.pipe(res);
			res.on('end', function() {
				child.kill();
			});
		}).listen(1337, "127.0.0.1");
		console.log('Server running at http://127.0.0.1:1337/');
	};
		
}).call(this);


Greenboard.start();


