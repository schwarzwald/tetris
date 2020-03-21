import { CCW } from './Direction';

export default class Tile {

  constructor(layout, tag) {
    this.layout = layout.split('\n').map(c => c.trim().split('').map(b => b == '#' ? 1 : 0));
    this.tag = tag;
  }

  getLayout() {
    return this.layout.slice();
  }

  getWidth() {
    return this.layout.reduce((a, c) => Math.max(a, c.length), 0);
  }

  getHeight() {
    return this.layout.length;
  }

  getTag() {
    return this.tag;
  }

  rotate(dir) {
    let height = this.getHeight();
    let width = this.getWidth();

    let rotated = new Array(width);

    for (let i = 0; i < width; i++) {
      rotated[i] = new Array(height);
    }

    this.layout.forEach((row, y) => {
      row.forEach((col, x) => {
        let newY = dir === CCW ? -x + width - 1 : x;
        let newX = dir === CCW ? y : -y + height - 1;

        rotated[newY][newX] = col;
      });
    });

    return new Tile(rotated.map(r => r.map(c => c ? '#' : '.').join('')).join('\n'), this.tag);
  }
}