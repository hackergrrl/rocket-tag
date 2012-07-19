"use strict"  // Use strict JavaScript mode

// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points

// Convenient access to some constructors
var Layer    = nodes.Layer
  , Scene    = nodes.Scene
  , Label    = nodes.Label
  , Director = cocos.Director
  , Player   = require('/Player')
  , Connection = require('/Connection')


var players = {};


/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function Uwgdc () {
    // You must always call the super class constructor
    Uwgdc.superclass.constructor.call(this);

    // Listen for keyboard input.
    this.isKeyboardEnabled = true;

    // Get director singleton
    var director = Director.sharedDirector;

    // Add the background.
    var bg = new nodes.Sprite({
        file: '/resources/bg.png'
    });
    bg.anchorPoint = ccp(0,0);
    this.addChild(bg);

    // For future reference in connection callbacks.
    var layer = this;

    // Connect to the game server.
    var connection = new Connection('http://localhost:8081');

    // When a player joins..
    connection.onPlayerAdded = function(id, isLocal) {

        var player = new Player();
        layer.addChild(player);

        players[id] = player;

        player.isLocal = isLocal;
        player.networkID = id;

        if(isLocal) {
            layer.player = player;
        }
    };

    // When a player leaves..
    connection.onPlayerRemoved = function(id) {

        var player = players[id];
        if(player) {
            layer.removeChild(player);
        }
    };

    // When a player moves..
    connection.onPlayerMoved = function(id, pos, vel, acc, rot) {

        var player = players[id];
        if(player) {
            player.position = pos;
            player.velocity = vel;
            player.acceleration = acc;
            player.rotation = rot;
        }
    };

    this.connection = connection;
    this.playerUpdateAccum = 0;

    this.scheduleUpdate();
}

// Inherit from cocos.nodes.Layer
Uwgdc.inherit(Layer, {

    keyDown: function(evt) {
        var key = evt.keyCode;
        this.player.keyDown(key);
    },

    keyUp: function(evt) {
        var key = evt.keyCode;
        this.player.keyUp(key);
    },

    update: function(dt) {

        this.playerUpdateAccum += dt;

        if(this.playerUpdateAccum > 0.2 && this.player) {
            this.connection.sendPlayerStatus(this.player);

            this.playerUpdateAccum = 0;
        }
    }
});

/**
 * Entry point for the application
 */
function main () {
    // Initialise application

    // Get director singleton
    var director = Director.sharedDirector;

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
        // Create a scene and layer
        var scene = new Scene(),
            layer = new Uwgdc();

        // Add our layer to the scene
        scene.addChild(layer);

        // Run the scene
        director.replaceScene(scene);
    });

    // Preload our assets
    director.runPreloadScene();
}

exports.main = main;

