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
  , Director = cocos.Director;

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function Uwgdc () {
    // You must always call the super class constructor
    Uwgdc.superclass.constructor.call(this);

    var s = Director.sharedDirector.winSize;

    var label = new Label({ string:   'Let\'s Make a Game in an Hour!',
                          fontName: 'Arial',
                          fontSize: 40
                          });
    label.position = ccp(s.width / 2, s.height / 2 + 100)
    this.addChild(label)

    var label2 = new Label({ string:   'Coming soon!',
                          fontName: 'Arial',
                          fontSize: 40
                          });
    label2.position = ccp(s.width / 2, s.height / 2 - 100)
    this.addChild(label2)

    label2.runAction( new cocos.actions.RepeatForever(
        new cocos.actions.Sequence({ actions: [
            new cocos.actions.RotateBy({ angle: 360, duration: 1 }),
            new cocos.actions.DelayTime({ duration: 1 })
        ]})
    ));
}

// Inherit from cocos.nodes.Layer
Uwgdc.inherit(Layer)

/**
 * Entry point for the application
 */
function main () {
    // Initialise application

    // Get director singleton
    var director = Director.sharedDirector

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
        // Create a scene and layer
        var scene = new Scene()
          , layer = new Uwgdc()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
