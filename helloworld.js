var http = require('http');

var MYAPP = function() {
	var boardsRequest = {
	  host: 'localhost',
	  port: 8080,
	  path: '/greenboard/web/boards'
	};

	var pollBoards = function() {	
		// fetch boards and process
		http.get(boardsRequest, function(res) {
		  console.log("Got response: " + res.statusCode);
		  res.on('data', function(data) {
		  	console.log(data.toString('utf-8'));
			// poll again in 2 seconds 
			setTimeout(pollBoards, 2000);
		  });
		// handle error
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
		});
	};

	return {
		poll : pollBoards
	}
}();

MYAPP.poll();

//http.createServer(function (req, res) {
//	MYAPP.handleRequest(req, res);
//}).listen(1337, "127.0.0.1");
//console.log('Server running at http://127.0.0.1:1337/');