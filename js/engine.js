var Engine = (function(global) {

  // setup the canvas
  var doc = global.document;
  var win = global.window;
  var canvas = doc.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var lastTime;

  canvas.width = global.gameGrid.width;
  canvas.height = global.gameGrid.height;
  doc.body.appendChild(canvas);

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
    var rowImages = [
      'images/water-block.png',   // Top row is water
      'images/stone-block.png',   // Row 1 of 3 of stone
      'images/stone-block.png',   // Row 2 of 3 of stone
      'images/stone-block.png',   // Row 3 of 3 of stone
      'images/grass-block.png',   // Row 1 of 2 of grass
      'images/grass-block.png'    // Row 2 of 2 of grass
    ];
    var numRows = 6;
    var numCols = 5;
    var row;
    var col;

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * global.gameGrid.cellWidth, row * global.gameGrid.cellHeight);
      }
    }

    renderEntities();
  }

  function renderEntities() {
    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */
    allEnemies.forEach(function(enemy) {
      enemy.render(ctx);
    });

    player.render(ctx);
  }

  /* This function does nothing but it could have been a good place to
   * handle game reset states - maybe a new game menu or a game over screen
   * those sorts of things. It's only called once by the init() method.
   */
  function reset() {
    // noop
  }

  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png'
  ]);
  Resources.onReady(init);

  global.ctx = ctx;
})(this);
