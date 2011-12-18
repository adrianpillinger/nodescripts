var io = require('socket.io').listen(80);

io.sockets.on('connection', function(socket) {
    socket.on('set nickname', function(name) {
        socket.set('nickname', name, function() {
            socket.emit('ready', {
                payload: 'Hi ' + name
            });
        });
    });

    socket.on('msg', function(data) {
        socket.get('nickname', function(err, name) {
            console.log('Chat message by ', name);
            socket.broadcast.emit('announcement', data);
        });
    });
});
