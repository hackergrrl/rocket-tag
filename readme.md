Rocket Tag
===========
A simple multiplayer game created in five hours for a talk on utilizing HTML5 technologies like Canvas and WebSockets to quickly create and prototype multiplayer games.

Technologies
=============
Rocket Tag relies on [Cocos2D-JS](https://github.com/RyanWilliams/cocos2d-javascript) for graphics and input, and [Socket.IO](http://socket.io/) for networking. The server is run using [Node.JS](http://nodejs.org/).

Server
=======
Setup: `npm install socket.io`.
Run: `node server.js` from `src/`.

Client
=======
Setup: `npm install cocos2d@0.2.0-beta`. `cocos make` in the home directory to build.
Run: Open `build/index.html` to connect to the running server.

