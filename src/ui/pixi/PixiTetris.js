import { Application, loader, Sprite } from 'pixi.js';
import catImg from '../../assets/cat.png';

export default class PixiTetris {

  constructor(tetris) {
    this.app = new Application({ width: 256, height: 256 });
    this.tetris = tetris;

    loader
      .add(catImg)
      .load(this._setup);
  }

  _setup() {
    //Create the cat sprite
    let cat = new Sprite(loader.resources[catImg].texture);

    //Add the cat to the stage
    this.app.stage.addChild(cat);
  }

  getView() {
    return this.app.view;
  }

}