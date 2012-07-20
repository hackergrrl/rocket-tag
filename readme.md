Rocket Tag
===========
A simple multiplayer game created in five hours for a talk on utilizing HTML5 technologies like Canvas and WebSockets to quickly create and prototype multiplayer games.

Technologies
=============
Rocket Tag relies on [Cocos2D-JS](https://github.com/RyanWilliams/cocos2d-javascript) for graphics and input, and [Socket.IO](http://socket.io/) for networking. The server is run using [Node.JS](http://nodejs.org/).

How-to: Server
===============
TODO: This is a little tedious, and a script should be written to make it simpler.

In short: after building the project, copy `server.js` from src/ into build/, and then run `node server.js`.

How-to: Client
===============
TODO: This _very_ obnoxious, and a script should be written to make it simpler. Currently it requires modifying the source of Cocos2D to include Socket.IO in the list of scripts to include, which is nasty and ugly and awful and you really shouldn't have to be subjected to it.

For those of you who are brave enough, you'll need to open `build/uwgdc/init.js` and manually add `"uwgdc/socket.io.js"` to the `scripts` var at the top to have it properly included. You will also need to copy the `socket.io.js` file into the `build/uwgdc/` directory. I'm so, so sorry for this.
