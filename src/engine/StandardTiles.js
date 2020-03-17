const Tile = require('./Tile');

module.exports = [
  new Tile('##\n##', 'O'),
  new Tile('#\n#\n#\n#', 'I'),
  new Tile('#.\n#.\n##', 'L'),
  new Tile('.#\n.#\n##', 'J'),
  new Tile('.##\n##.', 'S'),
  new Tile('##.\n.##', 'Z'),
  new Tile('.#.\n###', 'T'),
];