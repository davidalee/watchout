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
  var pos = randomCoordinateGenerator();
  this.position = pos;
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
}).attr('r', 10).attr('fill', 'red').attr('class', 'enemy');


// every tick: use d3.timer(xMilliSec, cb) to call the transition function(takes a cb [randomMove]) to animate
// use the transition function with tween to call collision detection function

d3.timer(300, function(){
  // generate new x- and y- coordinates for each enemy
    // call .move on all enemy instances
  // based on new x and y, transition all enemy instances
    // use transition.attr() on each enemy instance to set new cx and cy values (this.position.x, this.position.y)
  // check if player object comes into contact with any enemy
});

// Use setInterval to call .move() on each enemy
setInterval(function(){
  enemiesArr.forEach(function(enemy) {
    enemy.move();
  });

  board.selectAll('.enemy').transition().duration(2000).tween('tween', wrapper).attr('cx', function(d){ return d.position.x; })
       .attr('cy', function(d){ return d.position.y; });

  // return a function that compares this.position.x to player.position.x (same for .position.y)
    // if they're equal
      // reset current score
}, 3000);

// collision detection
  // detect when a player collides with an enemy
  // list coordinates that define the area of each enemy
  // set an object up with player area coordinates
    // check (at some interval) if player coords and enemy coords are equal
var collisionFlag = false;

setInterval(function(){
  if( collisionFlag ){
    stats.collisionCount++;
    collisionFlag = false;
  }
}, 1000);

function collisionDetection(d, enemyX, enemyY){
  d.position.x = enemyX;
  d.position.y = enemyY;
  var playerUpperX = + playerInstance.attr('cx') + 10;
  var playerLowerX = + playerInstance.attr('cx') - 10;
  var playerUpperY = + playerInstance.attr('cy') + 10;
  var playerLowerY = + playerInstance.attr('cy') - 10;
  var collision = (d.position.x > playerLowerX && d.position.x < playerUpperX) && (d.position.y > playerLowerY && d.position.y < playerUpperY);

  // function throttledCollision (){
  //   // increment score at most once per second
  //   // var wait = false;
  //   if( !wait ){
  //     stats.collisionCount++;
  //     wait = true;
  //     setTimeout(function(){
  //       wait = false;
  //     }, 1000);
  //     console.log(wait);
  //     setTimeout(function(){ console.log(wait)}, 1500);
  //   }

  // };

  if( collision ){
    console.log('collision detected!');
    collisionFlag = true;
    
    if( stats.currentScore > stats.highScore ){
      stats.highScore = stats.currentScore;
    }
    // reset score
    stats.currentScore = 0;
    // increment collision count via throttle function
    // if( !wait ){
    //   throttledCollision();
    // }
  }
  return false;
};

function wrapper(d){
  var context = this;

  d3.timer(function(){
    var enemyX = + d3.select(context).attr('cx');
    var enemyY = + d3.select(context).attr('cy');
    collisionDetection(d, enemyX, enemyY);
    stats.currentScore++;
  });
};

// Use d3.transition to update attribute to reflect move



// every tick: increment current score
// every tick: if currentScore > highScore
  // set highScore = currentScore;

function scoreKeeper (){
  // collision count and high score will be updated when there is a collision
};





// ****** Cool ideas ******
// having an enemy that moves towards the player (using .force, .gravity)
// point threshold tiers?
// implement difficulty tiers (e.g., hard mode, nightmare mode) that can be toggled on/off?
  // change enemy to somethng else for each level (whirling shuriken)
  // create a unique enemy for nightmare mode (the enemy that gravitates toward player?); "boss"
// reverse the game objective so instead of avoiding enemies, player tries to catch enemies, implement points multiplier?