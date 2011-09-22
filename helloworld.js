var http = require('http');
var Backbone = require('backbone');

(function(){
	
	// set root to this (the scope of this module during execution)
	var root = this;
	
	// namespace of greenboard app
	Greenboard = root.Greenboard = {};

	var boardsRequest = {
		host: 'www.google.co.uk',
		port: 80,
		path: '/'
	};
	
	Greenboard.poll = function poll() {	
		// fetch boards and process
		http.get(boardsRequest, function(res) {
			console.log("Got response: " + res.statusCode);
			setTimeout(poll, 2000);
			res.on('data', function(data) {
				// console.log(data.toString('utf-8'));
			});
		// handle error
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});
	};
	
	var Board = Backbone.Model.extend({
		validate: function(attrs) {
			if (attrs.name.length > 10)
			{
				return "name is too long";
			}
		}
	});

	var changeLogger = function() {
		console.log('change name');
	}
	
	Greenboard.demo = function demo() {	
		var board1 = new Board;
		var board2 = new Board;
		board1.bind('change:name', changeLogger);
		board2.bind('change:name', changeLogger);
		
		var errorHandler = {error: console.log('error')};
		board1.set({name:'board 1'}, errorHandler);
		board2.set({name:'a very long name for a board'}, errorHandler);
	};
	
}).call(this);


Greenboard.poll();
Greenboard.demo();


