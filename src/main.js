
const Direction = require('./engine/Direction');
const ConsoleTetris = require('./ui/console/ConsoleTetris');

let tetris = new ConsoleTetris();

window.addEventListener('keydown', e => {
  if (e.keyCode == '38') {
    tetris.tetris.rotate(Direction.CCW);
  }

  if (e.keyCode == '37') {
    tetris.tetris.move('LEFT');
  }

  if (e.keyCode == '39') {
    tetris.tetris.move('RIGHT');
  }
});
