import * as PIXI from 'pixi.js';
import CatImage from '../../assets/cat.png';

export default class PixiTetris {

  constructor(tetris) {
    this.app = new PIXI.Application({ width: 256, height: 256 });
    this.tetris = tetris;

    this.app.loader
      .add(CatImage)
      .load(this._setup.bind(this));
  }

  _setup() {
    //Create the cat sprite
    let cat = new PIXI.Sprite(this.app.loader.resources[CatImage].texture);

    //Add the cat to the stage
    this.app.stage.addChild(cat);
  }

  getView() {
    return this.app.view;
  }

}