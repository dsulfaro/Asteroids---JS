const Util = require("./utils.js")

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
