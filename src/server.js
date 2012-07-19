var fs = require('fs');
var http = require('http');
var path = require('path');

/* Set up game sockets server. */
var io = require('socket.io').listen(8081);
console.log('Game sockets server running on port 8081');

// World data.
var playerCount = 0;
var players = {};

// Send player status updates periodically.
setInterval( function() {
    io.sockets.clients().forEach( function(socket) {
        var data = { players: [] };
        for(var networkID in players) {
            if(networkID != socket.player.networkID) {
                var player = players[networkID];
                var elm = {
                    'networkID': networkID,
                    'pos': player.pos,
                    'rot': player.rot,
                    'vel': player.vel
                };
                data.players.push(elm);
            }
        }
        socket.emit('updatePlayers', data);
    });
}, 500);

io.sockets.on('connection', function (socket) {

    // Create a new player for this connection.
    var player = {
                 'networkID': playerCount++,
                 'pos': [ 400, 300 ],
                 'rot': 0
               };
    socket.player = player;
    players[player.networkID] = player;
    var data = {
                 'networkID': player.networkID,
                 'pos': player.pos,
                 'isLocal': true
               };
    socket.emit('createPlayer', data);

    // Inform the other players of this new player.
    data.isLocal = false;
    socket.broadcast.emit('createPlayer', data);
    socket.broadcast.emit('chat', socket.id+' has connected!');

    // Inform the player of the other players.
    for(var networkID in players) {
        if(networkID != data.networkID) {
            socket.emit('createPlayer', players[networkID]);
        }
    }

    socket.on('updatePlayerStatus', function(data) {
        socket.player.pos = data.pos;
        socket.player.rot = data.rot;
        socket.player.vel = data.vel;
    });

    socket.on('disconnect', function() {
        // Inform the other players of this player's removal.
        console.log(socket.player.networkID + " has disconnected.");
        var data = { 'networkID': socket.player.networkID };
        socket.broadcast.emit('removeProp', data);
        delete players[socket.player.networkID];
    });
});


/* Set up static file server. */
http.createServer(function (request, response) {
    console.log('Request: ' + JSON.stringify(request.url, null, 4));
    var filePath = '../build' + request.url;
    if (filePath == './')
        filePath = './index.html';
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
    path.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
}).listen(8080);
console.log('File server running on port 8080');

