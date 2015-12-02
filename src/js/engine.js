var GAME = GAME || {};

var Engine = (function(global) {

  // setup the canvas
  var doc = global.document;
  var win = global.window;
  var canvas = doc.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var lastTime;
  var mapTiles;

  canvas.width = GAME.grid.width;
  canvas.height = GAME.grid.height;
  //doc.body.appendChild(canvas);

  // main game loop
  function main() {

    // set the global speed of animation by adjusting dt
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    // update positions and render back to screen
    update(dt);
    render();

    // reset time delta
    lastTime = now;

    // continue loop
    win.requestAnimationFrame(main);
  }

  // This function does some initial setup that should only occur once
  function init() {
    reset();
    lastTime = Date.now();
    main();
  }

  //call all of the functions which may need to update entity's data
  function update(dt) {
    updateEntities(dt);
  }

  // loops through all of the enemies and update position
  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
  }

  // This function initially draws the "game level"
  function render() {
    var numRows = GAME.grid.height / GAME.grid.cellHeight;
    var numCols = GAME.grid.width / GAME.grid.cellWidth;
    var row;
    var col;

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        var image = GAME.tileImages[GAME.tileMap[col + (numCols * row)]];

        ctx.drawImage(Resources.get(image), col * GAME.grid.cellWidth, row * GAME.grid.cellHeight, GAME.grid.cellWidth, GAME.grid.cellHeight);

        //ctx.drawImage(Resources.get(image), col * GAME.grid.cellWidth, row * GAME.grid.cellHeight);

      }
    }

    renderEntities();
  }

  function renderEntities() {
    GAME.treasureMap.forEach(function(gem) {
      if (!gem.collected) {
        gem.render(ctx);
      }
    });

    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */
    allEnemies.forEach(function(enemy) {
      enemy.render(ctx);
    });

    if (GAME.begin) {
      player.render(ctx);
    } else {
      GAME.reset();
    }
  }

  /* This function does nothing but it could have been a good place to
   * handle game reset states - maybe a new game menu or a game over screen
   * those sorts of things. It's only called once by the init() method.
   */
  function reset() {
    // noop
  }

  Resources.load([
    'images/grass-block.png',
    'images/grass-block.png',
    'images/water-block.png',
    'images/stone-corner-topright.png',
    'images/water-corner-bottomleft.png',
    'images/water-corner-bottomright.png',
    'images/water-corner-topleft.png',
    'images/water-corner-topright.png',
    'images/stone-block.png',
    'images/stone-corner-bottomleft.png',
    'images/stone-corner-bottomright.png',
    'images/stone-corner-topleft.png',

    'images/enemy-bug.png',
    'images/char-boy.png',
    'images/Gem-Orange.png',
  ]);
  Resources.onReady(init);

  global.ctx = ctx;
})(this);
