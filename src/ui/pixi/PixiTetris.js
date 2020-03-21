import * as PIXI from 'pixi.js';

const RECT_SIZE = 20;

export default class PixiTetris {

  constructor(tetris) {
    this.app = new PIXI.Application({ width: RECT_SIZE * tetris.width, height: RECT_SIZE * tetris.height });
    this.tetris = tetris;

    this.baked = new PIXI.Container();
    this.current = new PIXI.Container();

    this.app.stage.addChild(this.baked);
    this.app.stage.addChild(this.current);
  }

  render() {
    this.baked.removeChildren();

    let { position, tile, grid } = this.tetris.getState();

    let y = 0;
    for (let row of grid) {
      let x = 0;
      for (let value of row) {
        if (value) {
          let rect = this._createRectangle();
          rect.x = RECT_SIZE * x;
          rect.y = RECT_SIZE * y;
          this.baked.addChild(rect);
        }
        x++;
      }
      y++;
    }

    this.current.removeChildren();

    y = 0;
    for (let row of tile.getLayout()) {
      let x = 0;
      for (let value of row) {
        if (value) {
          let rect = this._createRectangle();
          rect.x = RECT_SIZE * x;
          rect.y = RECT_SIZE * y;
          this.current.addChild(rect);
        }
        x++;
      }
      y++;
    }

    this.current.x = RECT_SIZE * position.x;
    this.current.y = RECT_SIZE * position.y;

  }

  _createRectangle() {
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, RECT_SIZE, RECT_SIZE);
    rectangle.endFill();
    return rectangle;
  }

  getView() {
    return this.app.view;
  }


}