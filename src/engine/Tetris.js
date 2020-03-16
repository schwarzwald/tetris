module.exports = class Tetris {

  constructor(width, height, generator) {
    this.width = width;
    this.height = height;
    this.generator = generator;
    this.listeners = new Map();

    this.grid = [...new Array(height)].map(r => new Array(width));

    this.current = null;
    this.next = null;
    this.position = null;
  }

  on(eventName, fn) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    this.listeners.get(eventName).push(fn);
  }

  getState() {
    return {
      position: { ...this.position },
      tile: this.current,
      grid: this.grid.map(r => r.slice())
    }
  }

  start() {
    this.next = this.generator.next();
    this._spawn();


  }

  pause() {

  }

  resume() {

  }

  move(dir) {
    let position = { ...this.position };
    if (dir === 'LEFT') {
      position.x--;
    } else {
      position.x++;
    }

    if (this._isValid(this.current, position)) {
      this.position = position;
      this._fireEvent('move', { position });
    }
  }

  rotate(dir) {
    if (this._isValid(this.current.rotate(dir), position)) {
      this.current = this.current.rotate(dir);
      this._fireEvent('rotate', { tile: this.current });
    }
  }

  _spawn() {
    let x = Math.floor(this.width / 2);
    let y = 0;

    this.position = { x, y };

    this.current = this.next;
    this.next = this.generator.next();

    this._fireEvent('generate', { next: this.next });
  }

  _step() {
    if (this._isValid(this.current, { x: this.position.x, y: this.position.y + 1 })) {
      this.position.y++;
      this._fireEvent('dropstep', {});
    } else {
      this._dropEnd();
      this._spawn();
    }
  }

  _isValid(tile, position) {
    let y = 0;
    for (let row of tile.getLayout()) {
      let x = 0;
      for (let value of row) {
        let py = y + position.y;
        let px = x + position.x;

        if (value && (py < 0 || py >= this.height || px < 0 || px >= this.width || this.grid[py][px])) {
          return false;
        }
        x++;
      }
      y++;
    }

    return true;
  }

  _dropEnd() {
    let y = 0;
    for (let row of this.current.getLayout()) {
      let x = 0;
      for (let value of row) {
        if (value) {
          this.grid[this.position.y + y][this.position.x + x] = this.current.getTag();
        }
        x++;
      }
      y++;
    }

    this._fireEvent('dropend', {});
  }

  _fireEvent(name, payload, update = true) {
    let listeners = this.listeners.get(name);

    if (listeners) {
      listeners.forEach(l => l.call(this, payload));
    }

    if (update) {
      this._fireEvent('update', {}, false);
    }
  }


}

