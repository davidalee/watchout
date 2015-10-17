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
  // changing player object position based on drag input
// create Enemy class
  // random movement within board
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

    // every tick: use d3.timer(xMilliSec, cb) to call the transition function(takes a cb [randomMove]) to animate
    // use the transition function with tween to call collision detection function