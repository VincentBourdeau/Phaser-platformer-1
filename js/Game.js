BasicGame.Game = function(game) {

  //  When a State is added to Phaser it automatically has the following properties set on it,
  //  even if they already exist:

  // Phaser's Vars
  this.game;        //	a reference to the currently running game
  this.add;         //	used to add sprites, text, groups, etc
  this.camera;      //	a reference to the game camera
  this.cache;       //	the game cache
  this.input;       //	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
  this.load;        //	for preloading assets
  this.math;        //	lots of useful common math operations
  this.sound;       //	the sound manager - add a sound, play one, set-up markers, etc
  this.stage;       //	the game stage
  this.time;        //	the clock
  this.tweens;      //  the tween manager
  this.state;       //	the state manager
  this.world;       //	the game world
  this.particles;   //	the particle manager
  this.physics;     //	the physics manager
  this.rnd;         //	the repeatable random number generator

};

BasicGame.Game.prototype = {

  /**
   *==================================
   * Init();
   * Initialize game variables
   *==================================
   */
  initVars: function(){

  	//	Game
    this.map = null;
		this.tileset = null;
		this.layer = null;
		this.bg = null;
		this.gravity = 250;

		//	Player
		this.Player = null;

		//	HUD
		

  },

  /**
   *==================================
   * DEFAULT PHASER'S AUTO FUNCTIONS
   *==================================
   */
  create: function() {

  	this.initVars();

  	//	Game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.stage.backgroundColor = '#000000';

    this.bg = this.game.add.tileSprite(0, 0, 800, 600, 'background');
    this.bg.fixedToCamera = true;

    this.map = this.game.add.tilemap('level2');

    this.map.addTilesetImage('tiles-1');

    this.map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    this.layer = this.map.createLayer('Tile Layer 1');

    //  Un-comment this on to see the collision tiles
    //	this.layer.debug = true;

    this.layer.resizeWorld();

    this.game.physics.arcade.gravity.y = this.gravity;

    //	Player
    this.Player = new Player(this.game, this.layer);
    this.Player.create();

    this.game.camera.follow(this.Player.player);

  },

  update: function() {

  	this.Player.update();

  },

  //  Debug ...
  render: function() {},

  /**
   *==================================
   * MISC FUNCTIONS
   * Custom made function
   *==================================
  */
  /**
   *
   *  FUNCTION quitGame();
   *
   *
   *
  */
  quitGame: function(pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    

    //	Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
