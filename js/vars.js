var GAME = GAME || {};

// global variables used for pretty much everything
// window.gameGrid = {
//   width: 505,
//   height: 606, //498
//   cellWidth: 101,
//   cellHeight: 83
// };

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
