// start slingin' some d3 here.

var options = {
  'width': 800,
  'height': 500,
  'enemyCount': 20
};

var stats = {
  'currentScore': 0,
  'highScore': 0,
  'collisionCount': 0
};

var axes = {
  'x': d3.scale.linear().domain([0, 100]).range([0, options.width]),
  'y': d3.scale.linear().domain([0, 100]).range([0, options.height])
};

var board = d3.select('#gameboard').append('svg').attr('width', options.width).attr('height', options.height);

// create player object
var player = {
  position: {
    'x': 400,
    'y': 250
  }

  // changing player object position based on drag input

};
// create Enemy class
var Enemy = function(position) {
  this.position = position || randomCoordinateGenerator();

  // consider shape property

  // random movement within board

};

Enemy.prototype.move = function() {
  // update this.position with a random pair of coords
  this.position = randomCoordinateGenerator();
};

function randomCoordinateGenerator() {
  var x = Math.floor(Math.random() * options.width);
  var y = Math.floor(Math.random() * options.height);
  //return two random coordinates (on the board area)
  return {x: x, y: y};
};

// Create player and append to DOM
var playerArr = [player];
var playerInstance = board.selectAll('circle').data(playerArr).enter().append('circle')
                          .attr('cx', player.position.x).attr('cy', player.position.y).attr('r', 10);
var drag = d3.behavior.drag().on('drag', function(playerOb) {
  var newX = + playerInstance.attr('cx') + d3.event.dx;
  var newY = + playerInstance.attr('cy') + d3.event.dy;
  playerInstance.attr('cx', newX);
  playerInstance.attr('cy', newY);
}).origin(function() {
  return player.position;
});
playerInstance.call(drag);

// Create and instantiate Enemies, append to DOM
var enemiesArr = [];
for( var i = 0; i < options.enemyCount; i++ ){
  enemiesArr.push(new Enemy);
}
var enemyInstances = board.selectAll('circle').data(enemiesArr).enter().append('circle').attr('cx', function(d){
  return d.position.x;
}).attr('cy', function(d){
  return d.position.y;
}).attr('r', 10).attr('fill', 'red');


// every tick: use d3.timer(xMilliSec, cb) to call the transition function(takes a cb [randomMove]) to animate
// use the transition function with tween to call collision detection function







// collision detection
  // detect when a player collides with an enemy
  // list coordinates that define the area of each enemy
  // set an object up with player area coordinates
    // check (at some interval) if player coords and enemy coords are equal
      // if collision then update score object
// update score based on either: 1) JS ticks, or 2) explore d3
// in some way measure time
  // possible d3 ticks at any interval (1/10th sec 1/1000th sec)
    // every tick: check for collisions
    // every tick: update score (if needed)


// maybe use General Update pattern style to generate enemies and append to DOM (game board?)





// ****** Cool ideas ******
// having an enemy that moves towards the player (using .force, .gravity)
// point threshold tiers?
// implement difficulty tiers (e.g., hard mode, nightmare mode) that can be toggled on/off?
  // change enemy to somethng else for each level (whirling shuriken)
  // create a unique enemy for nightmare mode (the enemy that gravitates toward player?); "boss"
// reverse the game objective so instead of avoiding enemies, player tries to catch enemies, implement points multiplier?