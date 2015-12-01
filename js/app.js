var GAME = GAME || {};

var resetSwitch = false;

// Now instantiate your objects.
var player = new Player();
//player.render();

var scoreboard = document.getElementById('points');
scoreboard.innerHTML = GAME.points;

var beginGameMessage = document.getElementById('beginGame-message');
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

var startGameBtn = document.getElementById('beginGameBtn');
startGameBtn.addEventListener('click', function(event) {
  GAME.begin = true;
  resetSwitch = false;
  document.getElementById('beginGame').classList.remove('active');
});

var restartGameBtn = document.getElementById('restartGameBtn');
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
document.addEventListener('keyup', function(e) {
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
};

function checkGems(cols, rows) {
  for (var i = 0; i < GAME.treasureMap.length; i++) {
    if (GAME.treasureMap[i].col === cols && GAME.treasureMap[i].row === rows) {
      GAME.treasureMap[i].collected = true;
      console.log('hit');
      GAME.points += GAME.treasureMap[i].points;
      scoreboard.innerHTML = GAME.points;
      GAME.gems++;
      if (GAME.gems == GAME.treasureMap.length) {
        GAME.begin = false;
        resetSwitch = true;
        document.getElementById('win').classList.add('active');
      }
    }
  }
}
