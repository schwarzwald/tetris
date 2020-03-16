const Tile = require('./Tile');

module.exports = class StandardGenerator {

  next() {
    return new Tile('####', 'I');
  }
}