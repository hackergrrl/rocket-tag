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

    this.scheduleUpdate();
}

Player.inherit(nodes.Node, {

    moveSpeed: 12.0,
    turnSpeed: 130.0,

    keys: {
        UP   : false,
        RIGHT: false,
        DOWN : false,
        LEFT : false
    },

    keyDown: function(key) {
        if(key == 38) {
            this.keys.UP = true;
        } else if(key == 37) {
            this.keys.LEFT = true;
        } else if(key == 40) {
            this.keys.DOWN = true;
        } else if(key == 39) {
            this.keys.RIGHT = true;
        }
    },

    keyUp: function(key) {
        if(key == 38) {
            this.keys.UP = false;
        } else if(key == 37) {
            this.keys.LEFT = false;
        } else if(key == 40) {
            this.keys.DOWN = false;
        } else if(key == 39) {
            this.keys.RIGHT = false;
        }
    },

    update: function(dt) {

        // Apply forward velocity.
        if(this.keys.UP) {
            var rotInRadians = (-this.rotation + 90) * (Math.PI / 180.0);
            var impulse = ccp( Math.cos(rotInRadians) * this.moveSpeed * dt,
                               Math.sin(rotInRadians) * this.moveSpeed * dt );
            this.velocity = geo.ccpAdd(this.velocity, impulse);
        }

        // Turn right or left.
        if(this.keys.RIGHT) {
            this.rotation += this.turnSpeed * dt;
        }
        if(this.keys.LEFT) {
            this.rotation -= this.turnSpeed * dt;
        }

        // Simulate air drag.
        this.velocity.x *= 0.99;
        this.velocity.y *= 0.99;

        // Apply graivty.
        this.velocity.y -= 6 * dt;

        // Apply velocity to position.
        this.position = geo.ccpAdd(this.position, this.velocity);

        // Wrap-around of player position.
        var size = Director.sharedDirector.winSize;
        if(this.position.y > size.height) {
            this.position.y = 0;
        }
        if(this.position.y < 0) {
            this.position.y = size.height;
        }
        if(this.position.x > size.width) {
            this.position.x = 0;
        }
        if(this.position.x < 0) {
            this.position.x = size.width;
        }
    }
});

module.exports = Player;

