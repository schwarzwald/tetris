const expect = require('expect.js');
const Tile = require('../../src/engine/Tile');
const Direction = require('../../src/engine/Direction');

describe('Test for tile', () => {

  it('Should provide tile as array', () => {
    let tile = new Tile('####', 'TAG');
    expect(tile.getLayout()).to.eql([[1, 1, 1, 1]]);

    tile = new Tile('##\n##');
    expect(tile.getLayout()).to.eql([[1, 1], [1, 1]]);
  });

  it('Should correctly rotate the L tile', () => {
    let tile = new Tile('####\n#...');
    tile = tile.rotate(Direction.CCW);
    expect(tile.getLayout()).to.eql([[1, 0], [1, 0], [1, 0], [1, 1]]);

    tile = tile.rotate(Direction.CCW);
    expect(tile.getLayout()).to.eql([[0, 0, 0, 1], [1, 1, 1, 1]]);

    tile = tile.rotate(Direction.CCW);
    expect(tile.getLayout()).to.eql([[1, 1], [0, 1], [0, 1], [0, 1]]);

    tile = tile.rotate(Direction.CCW);
    expect(tile.getLayout()).to.eql([[1, 1, 1, 1], [1, 0, 0, 0]]);
  });

  it('Should correctly rotate the T tile', () => {
    let tile = new Tile('.#.\n###');
    tile = tile.rotate(Direction.CW);
    expect(tile.getLayout()).to.eql([[1, 0], [1, 1], [1, 0]]);

    tile = tile.rotate(Direction.CW);
    expect(tile.getLayout()).to.eql([[1, 1, 1], [0, 1, 0]]);

    tile = tile.rotate(Direction.CW);
    expect(tile.getLayout()).to.eql([[0, 1], [1, 1], [0, 1]]);

    tile = tile.rotate(Direction.CW);
    expect(tile.getLayout()).to.eql([[0, 1, 0], [1, 1, 1]]);
  });

});