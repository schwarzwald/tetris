const Tetris = require('../../engine/Tetris');
const StandardGenerator = require('../../engine/StandardGenerator');

module.exports = class ConsoleTetris {

  constructor() {
    this.tetris = new Tetris(10, 20, new StandardGenerator());
    this.tetris.on('update', e => {
      this.render();
      setTimeout(() => {
        this.tetris._step();
      }, 300);
    });

    this.tetris.start();
  }

  render() {
    console.clear();

    let { position, tile, grid } = this.tetris.getState();

    let y = 0;
    for (let row of tile.getLayout()) {
      let x = 0;
      for (let value of row) {
        let py = y + position.y;
        let px = x + position.x;

        if (value) {
          grid[py][px] = '#';
        }
        x++;
      }
      y++;
    }
    let rendered = grid.map(row => row.map(c => c ? '#' : ' ').join()).join('\n');
    console.log(rendered);
  }

}