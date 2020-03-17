/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/engine/Direction.js":
/*!*********************************!*\
  !*** ./src/engine/Direction.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  CW: 'CW',
  CCW: 'CCW'
}

/***/ }),

/***/ "./src/engine/StandardGenerator.js":
/*!*****************************************!*\
  !*** ./src/engine/StandardGenerator.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const standardTiles = __webpack_require__(/*! ./StandardTiles */ "./src/engine/StandardTiles.js");

module.exports = class StandardGenerator {

  constructor(tiles = standardTiles) {
    this.tiles = tiles;
  }

  next() {
    return this.tiles[Math.floor(Math.random() * this.tiles.length)];
  }
}

/***/ }),

/***/ "./src/engine/StandardTiles.js":
/*!*************************************!*\
  !*** ./src/engine/StandardTiles.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(/*! ./Tile */ "./src/engine/Tile.js");

module.exports = [
  new Tile('##\n##', 'O'),
  new Tile('#\n#\n#\n#', 'I'),
  new Tile('#.\n#.\n##', 'L'),
  new Tile('.#\n.#\n##', 'J'),
  new Tile('.##\n##.', 'S'),
  new Tile('##.\n.##', 'Z'),
  new Tile('.#.\n###', 'T'),
];

/***/ }),

/***/ "./src/engine/Tetris.js":
/*!******************************!*\
  !*** ./src/engine/Tetris.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = class Tetris {

  constructor(width, height, generator) {
    this.width = width;
    this.height = height;
    this.generator = generator;
    this.listeners = new Map();

    this.grid = [...new Array(height)].map(r => {
      let row = new Array(width);
      row.fill(null);
      return row;
    });

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
    } else if (dir === 'RIGHT') {
      position.x++;
    }

    if (this._isValid(this.current, position)) {
      this.position = position;
      this._fireEvent('move', { position });
    }
  }

  rotate(dir) {
    if (this._isValid(this.current.rotate(dir), this.position)) {
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

    let removed = [];
    for (let i = this.height - 1; i >= 0; i--) {
      if (this.grid[i].filter(c => c != null).length == this.width) {
        removed.push(i);
      }
    }

    for (let i of removed) {
      this.grid.splice(i, 1);
    }

    for (let i of removed) {
      let row = new Array(this.width);
      row.fill(null);
      this.grid.unshift(row);
    }

    if (removed.length) {
      this._fireEvent('clear', { rows: removed });
    }

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



/***/ }),

/***/ "./src/engine/Tile.js":
/*!****************************!*\
  !*** ./src/engine/Tile.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Direction = __webpack_require__(/*! ./Direction */ "./src/engine/Direction.js");

module.exports = class Tile {

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
        let newY = dir === Direction.CCW ? -x + width - 1 : x;
        let newX = dir === Direction.CCW ? y : -y + height - 1;

        rotated[newY][newX] = col;
      });
    });

    return new Tile(rotated.map(r => r.map(c => c ? '#' : '.').join('')).join('\n'), this.tag);
  }
}

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const Direction = __webpack_require__(/*! ./engine/Direction */ "./src/engine/Direction.js");
const ConsoleTetris = __webpack_require__(/*! ./ui/console/ConsoleTetris */ "./src/ui/console/ConsoleTetris.js");

let tetris = new ConsoleTetris();

window.addEventListener('keydown', e => {
  if (e.keyCode == '38') {
    tetris.tetris.rotate(Direction.CCW);
  }

  if (e.keyCode == '37') {
    tetris.tetris.move('LEFT');
  }

  if (e.keyCode == '39') {
    tetris.tetris.move('RIGHT');
  }
});


/***/ }),

/***/ "./src/ui/console/ConsoleTetris.js":
/*!*****************************************!*\
  !*** ./src/ui/console/ConsoleTetris.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Tetris = __webpack_require__(/*! ../../engine/Tetris */ "./src/engine/Tetris.js");
const StandardGenerator = __webpack_require__(/*! ../../engine/StandardGenerator */ "./src/engine/StandardGenerator.js");

module.exports = class ConsoleTetris {

  constructor() {
    this.scheduled = false;

    this.tetris = new Tetris(10, 20, new StandardGenerator());
    this.tetris.on('update', e => {
      this._schedule();
      this.render();
    });

    this.tetris.start();
  }

  _schedule() {
    if (!this.scheduled) {
      setTimeout(() => {
        this.scheduled = false;
        this.tetris._step();
      }, 300);

      this.scheduled = true;
    }
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
    let rendered = grid.map(row => row.map(c => c ? '#' : ' ').join('')).join('\n');
    console.log(rendered);
  }

}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map