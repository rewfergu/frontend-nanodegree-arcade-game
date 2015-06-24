// global variables used for pretty much everything
window.gameGrid = {
  width: 505,
  height: 606, //498
  cellWidth: 101,
  cellHeight: 83
};

// Sprite Superclass
var Sprite = function(img) {
  this.sprite = img;
  this.x = 0;
  this.y = 0;
  this.height = 0;
  this.width = 0;
};

// Draw the sprite on the screen, required method for game
Sprite.prototype.render = function(ctx) {
  if (ctx) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Enemies our player must avoid
var Enemy = function() {
  Sprite.call(this, 'images/enemy-bug.png');
  this.x = Math.random() * -503;
  this.y = window.gameGrid.cellHeight * (Math.floor(Math.random() * (3)) + 1);
  this.speed = (Math.random() * 300) + 100;
};

// fix the enemy prototype
Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// Update the sprite position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  // set horizontal boundaries for enemies
  if (this.x < window.gameGrid.width) {

    // keep moving along at defined speed
    this.x += dt * this.speed;

  // if they go off screen, then reset position
  } else {

    // reset x/y and speed values
    this.x = -window.gameGrid.cellWidth;
    this.speed = (Math.random() * 300) + 100;
    this.y = window.gameGrid.cellHeight * (Math.floor(Math.random() * (3)) + 1);
  }

  // check for collision
  if (this.x < player.x + window.gameGrid.cellWidth &&
      this.x + window.gameGrid.cellWidth > player.x &&
      this.y < player.y + window.gameGrid.cellHeight &&
      window.gameGrid.cellHeight + this.y > player.y) {
    player.reset();
  }
};

// player class
var Player = function() {
  Sprite.call(this, 'images/char-boy.png');
  this.resetX = window.gameGrid.cellWidth * 2;
  this.resetY = window.gameGrid.cellHeight * 5;
  this.x = this.resetX;
  this.y = this.resetY;

  this.reset = function() {
    this.x = this.resetX;
    this.y = this.resetY;
    console.log('player reset');
  };

  this.handleInput = function(key) {
    switch (key) {
      case 'up':
        if (this.y > 0) {
          this.y -= window.gameGrid.cellHeight;
        }
        break;
      case 'down':
        if (this.y < window.gameGrid.cellHeight * 5) {
          this.y += window.gameGrid.cellHeight;
        }
        break;
      case 'left':
        if (this.x > 0) {
          this.x -= window.gameGrid.cellWidth;
        }
        break;
      case 'right':
        if (this.x < window.gameGrid.cellWidth * 4) {
          this.x += window.gameGrid.cellWidth;
        }
        break;
    }
  };

};

// fix player prototype
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

// Now instantiate your objects.
var player = new Player();
player.render();
var allEnemies = [
  new Enemy(),
  new Enemy(),
  new Enemy()
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
