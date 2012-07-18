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

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function Uwgdc () {
    // You must always call the super class constructor
    Uwgdc.superclass.constructor.call(this);

    // Get director singleton
    var director = Director.sharedDirector;

    this.player = new Player();
    this.addChild(this.player);
    this.player.position = ccp(director.winSize.width/2, director.winSize.height/2);
}

// Inherit from cocos.nodes.Layer
Uwgdc.inherit(Layer);

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

