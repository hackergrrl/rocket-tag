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

/**
 * @class Player
 */
function Player() {

    Player.superclass.constructor.call(this);

    // Create sprite overlays.
    this.sprite = new nodes.Sprite({
        file: '/resources/plr_normal.png',
        rect: new geo.Rect(0,0,32,32)
    });
    this.addChild(this.sprite);

    this.scale = 1.5;

    this.velocity = ccp(0,0);
}

Player.inherit(nodes.Node, {

    moveSpeed: 5.0,
    turnSpeed: 3.0,

    keys: {
        UP   : false,
        RIGHT: false,
        DOWN : false,
        LEFT : false
    },

    keyDown: function(key) {
        if(key == 87) {  // W
            this.keys.UP = true;
        } else if(key == 65) { // A
            this.keys.LEFT = true;
        } else if(key == 83) { // S
            this.keys.DOWN = true;
        } else if(key == 68) { // D
            this.keys.RIGHT = true;
        }
    },

    keyUp: function(key) {
        if(key == 87) {  // W
            this.keys.UP = false;
        } else if(key == 65) { // A
            this.keys.LEFT = false;
        } else if(key == 83) { // S
            this.keys.DOWN = false;
        } else if(key == 68) { // D
            this.keys.RIGHT = false;
        }
    },

    update: function(dt) {

        if(this.keys.UP) {
            var rotInRadians = this.rotation * (Math.PI / 180.0);
            var impulse = ccp( Math.cos(rotInRadians) * this.moveSpeed,
                               Math.sin(rotInRadians) * this.moveSpeed );
            this.velocity = geo.ccpAdd(this.velocity, impulse);
        }
        if(this.keys.RIGHT) {
            this.rotation += this.rotationSpeed;
        }
        if(this.keys.LEFT) {
            this.rotation -= this.rotationSpeed;
        }
    }
});

module.exports = Player;

