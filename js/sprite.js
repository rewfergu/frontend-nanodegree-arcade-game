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
