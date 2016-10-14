const Asteroid = require('./asteroid.js');
const Bullet = require('./bullet.js');
const Game = require('./game.js');
const GameView = require('./game_view.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');
const Util = require('./utils.js');

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
