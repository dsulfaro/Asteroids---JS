const Asteroid = require("./asteroid.js")

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
