import Tetris from './engine/Tetris';
import { CCW } from './engine/Direction';
import ConsoleTetris from './ui/console/ConsoleTetris';
import StandardGenerator from './engine/StandardGenerator';
import PixiTetris from './ui/pixi/PixiTetris';

const tetris = new Tetris(10, 20, new StandardGenerator());

//let consoleTetris = new ConsoleTetris(tetris);
let pixiTetris = new PixiTetris(tetris);

window.addEventListener('keydown', e => {
  if (e.keyCode == '38') {
    tetris.rotate(CCW);
  }

  if (e.keyCode == '37') {
    tetris.move('LEFT');
  }

  if (e.keyCode == '39') {
    tetris.move('RIGHT');
  }
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(pixiTetris.getView());
