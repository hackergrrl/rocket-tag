var fs = require('fs');
var http = require('http');
var path = require('path');

/* Set up static file server. */
http.createServer(function (request, response) {
    console.log('Request: ' + JSON.stringify(request.url, null, 4));
    var filePath = '../build' + request.url;
    if (filePath == './')
        filePath = './index.htm';
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

