Rocket Tag
===========
A simple multiplayer game created in five hours for a talk on utilizing HTML5 technologies like Canvas and WebSockets to quickly create and prototype multiplayer games.

Technologies
=============
Rocket Tag relies on [Cocos2D-JS](https://github.com/RyanWilliams/cocos2d-javascript) for graphics and input, and [Socket.IO](http://socket.io/) for networking. The server is run using [Node.JS](http://nodejs.org/).

Server
=======
Install the server-side flavour of Socket.IO using `npm install socket.io`. To run, simply execute `node server.js` from `src/`.

Client
=======
`npm install -g` in the main directory to install all client dependencies, then `cocos make` to build.

To test locally, open `build/index.html` in your browser of choice.

