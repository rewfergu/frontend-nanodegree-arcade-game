var GAME = GAME || {};

GAME.points = 0;
GAME.gems = 0;
GAME.begin = false;
GAME.message = 'test message';
GAME.lives = 4;

GAME.grid = {
  width: 800,
  height: 640, //498
  cellWidth: 32,
  cellHeight: 32,
  cols: 800 / 32,
  rows: 640 / 32,
};

GAME.tileMap = [
  1, 1, 1, 1, 1, 1, 1, 8, 7, 7, 7, 9, 1, 1, 8, 7, 9, 1, 1, 1, 1, 1, 1, 8, 7, 1, 5, 2, 6, 1, 1, 1, 1, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 6, 1, 1, 1, 8, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 10, 7, 11, 1, 1, 5, 2, 2, 2, 2, 6, 1, 1, 1, 1, 3, 4, 1, 5, 2, 6, 1, 1, 1, 10, 7, 7, 9, 1, 1, 2, 2, 2, 2, 2, 4, 1, 1, 1, 1, 1, 1, 5, 2, 2, 2, 2, 6, 1, 8, 7, 7, 1, 1, 1, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 5, 2, 2, 2, 2, 2, 4, 1, 1, 7, 7, 11, 1, 1, 1, 3, 2, 2, 4, 1, 10, 7, 11, 1, 1, 3, 2, 2, 2, 2, 4, 1, 1, 1, 8, 7, 9, 1, 1, 1, 1, 3, 4, 1, 1, 8, 7, 7, 11, 1, 1, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 7, 9, 1, 1, 1, 1, 1, 1, 1, 10, 11, 1, 1, 1, 5, 6, 1, 1, 1, 1, 10, 7, 11, 1, 1, 9, 1, 1, 1, 1, 1, 5, 6, 1, 8, 7, 11, 1, 5, 2, 2, 6, 1, 1, 8, 7, 7, 7, 11, 1, 1, 1, 1, 1, 1, 5, 2, 2, 1, 1, 8, 9, 1, 2, 2, 2, 2, 6, 1, 1, 8, 7, 9, 1, 1, 1, 1, 1, 5, 2, 2, 2, 2, 6, 1, 1, 1, 1, 3, 2, 2, 2, 4, 1, 1, 1, 1, 1, 1, 10, 1, 1, 5, 2, 2, 2, 2, 2, 4, 1, 10, 11, 1, 1, 3, 2, 4, 1, 1, 1, 1, 5, 6, 1, 8, 1, 1, 3, 2, 2, 2, 2, 1, 1, 10, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 1, 1, 1, 1, 1, 3, 2, 2, 4, 1, 1, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 2, 6, 1, 7, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 6, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 7, 7, 11, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 2, 6, 1, 1, 5, 2, 2, 2, 2, 2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 2, 2, 4, 1, 1, 3, 2, 2, 2, 2, 4, 1, 1, 2, 2, 6, 1, 5, 6, 1, 1, 1, 3, 2, 2, 2, 4, 1, 1, 1, 1, 3, 2, 4, 1, 1, 1, 10, 2, 2, 2, 2, 2, 2, 6, 1, 1, 1, 1, 1, 1, 1, 1, 10, 11, 1, 1, 1, 1, 1, 10, 7, 7,
];

GAME.tileImages = [
  'images/grass-block.png',
  'images/grass-block.png',
  'images/water-block.png',
  'images/water-corner-bottomleft.png',
  'images/water-corner-bottomright.png',
  'images/water-corner-topleft.png',
  'images/water-corner-topright.png',
  'images/stone-block.png',
  'images/stone-corner-bottomleft.png',
  'images/stone-corner-bottomright.png',
  'images/stone-corner-topleft.png',
  'images/stone-corner-topright.png',
];

var resetSwitch = false;
var startGameBtn = document.getElementById('beginGameBtn');
var restartGameBtn = document.getElementById('restartGameBtn');
var scoreboard = document.getElementById('points');
var beginGameMessage = document.getElementById('beginGame-message');

// Sprite Superclass
// player and enemies inherit from this
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

// Enemies Class
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

// player class
var Player = function() {
  Sprite.call(this, 'images/char-boy.png');
  this.resetX = GAME.grid.cellWidth * (Math.floor(GAME.grid.cols / 2));
  this.resetY = GAME.grid.cellHeight * (Math.floor(GAME.grid.rows / 2));
  this.x = this.resetX;
  this.y = this.resetY;

  this.lives = 3;
  this.points = 0;

  this.reset = function() {
    this.x = this.resetX;
    this.y = this.resetY;
    console.log('player reset');
  };

  this.handleInput = function(key) {
    var _x = this.x;
    var _y = this.y;

    var thiscol;
    var thisrow;
    var thisBlock;

    switch (key) {
      case 'up':

        // check bounds
        if (this.y > 0) {
          _y -= GAME.grid.cellHeight;

          thiscol = _x / GAME.grid.cellWidth;
          thisrow = _y / GAME.grid.cellHeight;
          thisBlock = (thisrow * GAME.grid.cols) + thiscol;

          // check terrain
          if (checkTerrain(GAME.tileMap[thisBlock])) {
            this.y -= GAME.grid.cellHeight;
          }

          // check gems
          checkGems(thiscol, thisrow);
        }

        break;
      case 'down':

        // check bounds
        if (this.y < GAME.grid.cellHeight * (GAME.grid.rows - 1)) {
          _y += GAME.grid.cellHeight;

          thiscol = _x / GAME.grid.cellWidth;
          thisrow = _y / GAME.grid.cellHeight;
          thisBlock = (thisrow * GAME.grid.cols) + thiscol;

          // check terrain
          if (checkTerrain(GAME.tileMap[thisBlock])) {
            this.y += GAME.grid.cellHeight;
          }

          // check gems
          checkGems(thiscol, thisrow);
        }

        break;
      case 'left':

        // check bounds
        if (this.x > 0) {
          _x -= GAME.grid.cellWidth;

          thiscol = _x / GAME.grid.cellWidth;
          thisrow = _y / GAME.grid.cellHeight;
          thisBlock = (thisrow * GAME.grid.cols) + thiscol;

          // check terrain
          if (checkTerrain(GAME.tileMap[thisBlock])) {
            this.x -= GAME.grid.cellWidth;
          }

          // check gems
          checkGems(thiscol, thisrow);
        }

        break;
      case 'right':
        if (this.x < GAME.grid.cellWidth * (GAME.grid.cols - 1)) {
          _x += GAME.grid.cellWidth;

          thiscol = _x / GAME.grid.cellWidth;
          thisrow = _y / GAME.grid.cellHeight;
          thisBlock = (thisrow * GAME.grid.cols) + thiscol;

          // check terrain
          if (checkTerrain(GAME.tileMap[thisBlock])) {
            this.x += GAME.grid.cellWidth;
          }

          // check gems
          checkGems(thiscol, thisrow);
        }

        break;
    }
  };

};

// fix player prototype
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

// gem class
var Gem = function(cols, rows) {
  Sprite.call(this, 'images/Gem-Orange.png');
  this.collected = false;
  this.points = 100;
  this.col = cols;
  this.row = rows;
  this.x = GAME.grid.cellWidth * cols;
  this.y = GAME.grid.cellHeight * rows;
};

// fix player prototype
Gem.prototype = Object.create(Sprite.prototype);
Gem.prototype.constructor = Player;














// Now instantiate your objects.
var player = new Player();


scoreboard.innerHTML = GAME.points;
beginGameMessage.innerHTML = GAME.lives;

var lives = document.getElementById('livesLeft');
lives.innerHTML = GAME.lives;

var allEnemies = [
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
];

GAME.treasureMap = [
  new Gem(5, 0),
  new Gem(0, 15),
  new Gem(4, 8),
  new Gem(7, 19),
  new Gem(15, 6),
  new Gem(17, 9),
  new Gem(15, 17),
  new Gem(22, 1),
  new Gem(22, 19),
  new Gem(23, 13),
];

GAME.reset = function() {
  if (!resetSwitch) {
    resetSwitch = true;

    if (GAME.lives > 1) {
      GAME.begin = false;
      document.getElementById('beginGame').classList.add('active');
      GAME.lives--;
      beginGameMessage.innerHTML = GAME.lives;
      lives.innerHTML = GAME.lives;
    } else {
      document.getElementById('gameOver').classList.add('active');
      GAME.begin = false;
      resetSwtich = false;
    }

    player.reset();
  }
};

// start game button
startGameBtn.addEventListener('click', function(event) {
  GAME.begin = true;
  resetSwitch = false;
  document.getElementById('beginGame').classList.remove('active');
});

// restart game button
restartGameBtn.addEventListener('click', function(event) {
  GAME.begin = true;
  resetSwitch = false;
  document.getElementById('gameOver').classList.remove('active');
  GAME.lives = 3;
  GAME.points = 0;
  GAME.gems = 0;
  scoreboard.innerHTML = GAME.points;
  beginGameMessage.innerHTML = GAME.lives;
  lives.innerHTML = GAME.lives;

  GAME.treasureMap.forEach(function(gem) {
    gem.collected = false;
  });

  player.reset();
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function checkTerrain(block) {
  switch (block) {
    case 2:
      return false;
    case 3:
      return false;
    case 4:
      return false;
    case 5:
      return false;
    case 6:
      return false;
    default:
      return true;
  }
}

function checkGems(cols, rows) {
  for (var i = 0; i < GAME.treasureMap.length; i++) {
    if (GAME.treasureMap[i].col === cols && GAME.treasureMap[i].row === rows && GAME.treasureMap[i].collected == false) {
      GAME.treasureMap[i].collected = true;
      GAME.points += GAME.treasureMap[i].points;
      scoreboard.innerHTML = GAME.points;
      GAME.gems++;
      console.log(GAME.gems);
      if (GAME.gems == GAME.treasureMap.length) {
        GAME.begin = false;
        resetSwitch = true;
        document.getElementById('win').classList.add('active');
      }
    }
  }
}
