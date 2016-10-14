const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");

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
