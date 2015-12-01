var GAME = GAME || {};

// Enemies our player must avoid
var Enemy = function() {
  Sprite.call(this, 'images/enemy-bug.png');
  this.x = Math.random() * -503;
  this.y = GAME.grid.cellHeight * (Math.floor(Math.random() * GAME.grid.cols));
  this.speed = (Math.random() * 300) + 100;
};

// fix the enemy prototype
Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// Update the sprite position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  // set horizontal boundaries for enemies
  if (this.x < GAME.grid.width) {

    // keep moving along at defined speed
    this.x += dt * this.speed;

  // if they go off screen, then reset position
  } else {

    // reset x/y and speed values
    this.x = -GAME.grid.cellWidth;
    this.speed = (Math.random() * 300) + 100;
    this.y = GAME.grid.cellHeight * (Math.floor(Math.random() * GAME.grid.cols));
  }

  // check for collision
  if (this.x < player.x + GAME.grid.cellWidth &&
      this.x + GAME.grid.cellWidth > player.x &&
      this.y < player.y + GAME.grid.cellHeight &&
      GAME.grid.cellHeight + this.y > player.y) {
    if (GAME.begin) {
      GAME.reset();
    }
  }
};
