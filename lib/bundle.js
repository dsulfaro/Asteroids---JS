/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(1);
	const Bullet = __webpack_require__(4);
	const Game = __webpack_require__(5);
	const GameView = __webpack_require__(6);
	const MovingObject = __webpack_require__(3);
	const Ship = __webpack_require__(7);
	const Util = __webpack_require__(2);

	document.addEventListener("DOMContentLoaded", function(event){
	  let ctx = (document.getElementsByTagName("canvas")[0]).getContext("2d");
	  let gameView = new GameView(ctx);
	  gameView.start();
	});

	// const canvasEl = document.getElementsByTagName("canvas")[0].getContext("2d");
	// canvasEl.height = window.innerHeight;
	// canvasEl.width = window.innerWidth;

	// const ctx = canvasEl.getContext("2d");
	//
	// const mo = new MovingObject(
	//   { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
	// );
	//
	// mo.draw(ctx);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(2);
	const MovingObject = __webpack_require__(3);

	const Asteroid = function(game, pos){
	  let options = { pos: pos, vel: Util.randomVec(1), color: "white", radius: 50, game: game};
	  MovingObject.call(this, options)
	};
	// this.pos = options["pos"];
	// this.vel = options["vel"];
	// this.color = options["color"];
	// this.radius = options["radius"];

	Util.inherits(Asteroid, MovingObject);
	module.exports = Asteroid;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const Util = {

	  inherits(child, parent){
	    function Surrogate(){};
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    child.prototype.constructor = child;
	  },

	  // Return a randomly oriented vector with the given length.
	  randomVec (length) {
	    var deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },

	  calcDist (pos1, pos2) {
	    return Math.sqrt( ((pos1[0] - pos1[0]) * (pos1[0] - pos1[0])) + ((pos1[1] - pos1[1]) * (pos1[1] - pos1[1])) )
	  }

	};
	module.exports = Util;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(2)

	const MovingObject = function (options){
	  this.pos = options["pos"];
	  this.vel = options["vel"];
	  this.color = options["color"];
	  this.radius = options["radius"];
	  this.game = options["game"];
	};

	MovingObject.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function() {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.game.wrap(this.pos);
	}

	module.exports = MovingObject;

	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  let rad1 = this.pos
	  let rad2 = otherObject.pos
	  let collisionDistance = this.radius + otherObject.radius

	  if (Util.calcDist(rad1, rad2) < collisionDistance) {
	    return true;
	  } else {
	    return false;
	  }
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	function Bullet (){};
	module.exports = Bullet;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(1)

	const Game = function(){
	  const DIM_X = 1000;
	  const DIM_Y = 750;
	  const NUM_ASTEROIDS = 10;
	  this.asteroids = [];


	  for(let idx = 0; idx < NUM_ASTEROIDS; idx++) {
	    this.asteroids.push( new Asteroid(this, this.randomPosition() ) );
	  };

	};

	// Game.prototype.addAsteroids = function() {
	//   for(let idx = 0; idx < this.NUM_ASTEROIDS; idx++) {
	//     this.asteroids.push( new Asteroid( this.randomPosition() ) );
	//   }
	// }

	Game.prototype.randomPosition = function() {
	  return [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 750)];
	}

	Game.prototype.moveObjects = function() {
	  this.asteroids.forEach( function(asteroid) {
	    asteroid.move();
	  });
	}

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, 1000, 750);

	  this.asteroids.forEach( function(asteroid) {
	    asteroid.draw(ctx);
	  });

	}

	Game.prototype.wrap = function(pos) {
	  if (pos[0] > 1000) {
	    pos[0] = 0;
	  }

	  if (pos[1] > 750) {
	    pos[1] = 0;
	  }

	  if (pos[0] < 0) {
	    pos[0] = 1000;
	  }

	  if (pos[1] < 0) {
	    pos[1] = 750;
	  }

	  return pos;
	}

	Game.prototype.checkCollisions = function() {
	  
	}


	module.exports = Game;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(5)

	const GameView = function(ctx){
	  console.log(ctx);
	  this.ctx = ctx;
	  this.game = new Game();
	};

	GameView.prototype.start = function(){
	  this.game.moveObjects();
	  window.setInterval(() => {
	    this.game.moveObjects();
	    this.game.draw(this.ctx);
	  }, 20);
	}

	module.exports = GameView;


/***/ },
/* 7 */
/***/ function(module, exports) {

	function Ship (){};
	module.exports = Ship;


/***/ }
/******/ ]);