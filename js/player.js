var GAME = GAME || {};

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
