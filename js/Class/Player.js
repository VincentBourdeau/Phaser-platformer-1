
/**
 *
 *  Class Player
 *
 *  Player controlled by the user
 *
 */

Player = function ( game, layer ) {

    //  Game's vars
    this.game = game;
    this.layer = layer;

    //  Player
    this.player = null;
		this.facing = 'left';
		this.cursors = null;
		this.jumpTimer = 0;
		this.jumpButton = null;
		this.jumpDelay = 750;
		this.speed = 150;

};

Player.prototype = {

  /**
   *
   *  FUNCTION create();
   *
   *  Constructor, init
   *
   */
  create: function(){

    this.player = this.game.add.sprite(32, 32, 'dude');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.body.bounce.y = 0.2;
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(20, 32, 5, 16);

    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('turn', [4], 20, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    this.jumpTimer = this.game.time.now + this.jumpDelay;

    this.cursors = this.game.input.keyboard.createCursorKeys();

  },

  /**
   *
   *  FUNCTION update();
   *
   *  EnterFrame, process timed events
   *
   */
  update: function(){

  	//	Collisions detections between Player and the TileMap
    this.game.physics.arcade.collide(this.player, this.layer);

    //	Player initaly don't move
    this.stopMove();

    if (this.cursors.left.isDown){

    	//	Player go left
    	this.goLeft();

    }else if (this.cursors.right.isDown){

    	//	Player go right
      this.goRight();

    }else{

    	//	Player be idle
	    this.beIdle();

    }

    if (this.cursors.up.isDown){

    	//	Player jump
      this.jump();

    }

  },

  //  Debug function
  render: function(){},
  
  




  /**
   *==================================
   * MISC FUNCTIONS
   * Custom made function
   *==================================
   */

  /**
   *
   *  FUNCTION stopMove();
   *
   *
   *
   */
  stopMove: function(){

  	this.player.body.velocity.x = 0;

  },

  /**
   *
   *  FUNCTION goLeft();
   *
   *
   *
   */
  goLeft: function(){

   	this.player.body.velocity.x = -this.speed;

    if (this.facing != 'left'){
        this.player.animations.play('left');
        this.facing = 'left';
    }

  },

  /**
   *
   *  FUNCTION goRight();
   *
   *
   *
   */
  goRight: function(){

   	this.player.body.velocity.x = this.speed;

    if (this.facing != 'right'){

        this.player.animations.play('right');
        this.facing = 'right';

    }

  },

  /**
   *
   *  FUNCTION beIdle();
   *
   *
   *
   */
  beIdle: function(){

   	if (this.facing != 'idle'){

      this.player.animations.stop();

      if (this.facing == 'left'){
          this.player.frame = 0;
      }else{
          this.player.frame = 5;
      }

      this.facing = 'idle';

    }

  },

  /**
   *
   *  FUNCTION jump();
   *
   *
   *
   */
  jump: function(){

  	if (this.player.body.onFloor() && this.game.time.now > this.jumpTimer){

      this.player.body.velocity.y = -this.speed * 1.5;
      this.jumpTimer = this.game.time.now + this.jumpDelay;

    }

  },

  /**
   *
   *  FUNCTION quitGame();
   *
   *
   *
   */
  quitGame: function(pointer) {

    //  Destroyz
    

  }

}
