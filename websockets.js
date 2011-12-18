var io = require('socket.io').listen(80);

var chat = io.of('/chat').on('connection', function(socket) {
    socket.emit('a message', {
        that: 'only',
        '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in',
        '/chat': 'will get'
    });
});

function emitNews(socket) {
    socket.emit('item', {
        news: 'item'
    });
}

var news = io.of('/news').on('connection', function(socket) {
    emitNews(socket);
});
