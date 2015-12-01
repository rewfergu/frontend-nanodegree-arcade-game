var GAME = GAME || {};

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
