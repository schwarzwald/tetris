import standardTiles from './StandardTiles';

export default class StandardGenerator {

  constructor(tiles = standardTiles) {
    this.tiles = tiles;
  }

  next() {
    return this.tiles[Math.floor(Math.random() * this.tiles.length)];
  }
}