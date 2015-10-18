// Some d3 here:

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

// Create Board:
var board = d3.select('#gameboard').append('svg').attr('width', options.width).attr('height', options.height);

// Create player object:
var player = {
  position: {
    'x': 400,
    'y': 250
  }
};

// Create Enemy class:
var Enemy = function(position) {
  this.position = position || randomCoordinateGenerator();
};

Enemy.prototype.move = function() {
  // Update this.position with a random pair of coords:
  var pos = randomCoordinateGenerator();
  this.position = pos;
};

function randomCoordinateGenerator() {
  var x = Math.floor(Math.random() * options.width);
  var y = Math.floor(Math.random() * options.height);
  // Return two random coordinates (on the board area):
  return {x: x, y: y};
};

// Create player and append to DOM:
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

// Create and instantiate Enemies, append to DOM:
var enemiesArr = [];
for( var i = 0; i < options.enemyCount; i++ ){
  enemiesArr.push(new Enemy);
}
var enemyInstances = board.selectAll('circle').data(enemiesArr).enter().append('circle').attr('cx', function(d){
  return d.position.x;
}).attr('cy', function(d){
  return d.position.y;
}).attr('r', 10).attr('fill', 'red').attr('class', 'enemy');

// Use setInterval to call .move() on each enemy:
setInterval(function(){
  enemiesArr.forEach(function(enemy) {
    enemy.move();
  });

  board.selectAll('.enemy').transition().duration(2000).tween('tween', wrapper).attr('cx', function(d){ return d.position.x; })
       .attr('cy', function(d){ return d.position.y; });
}, 3000);

// Collision Detection:
  // Detect when a player collides with an enemy.
  // List coordinates that define the area of each enemy.
  // Set an object up with player area coordinates.
    // Check (at some interval) if player coords and enemy coords are equal.
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

  if( collision ){
    collisionFlag = true;
    
    if( stats.currentScore > stats.highScore ){
      stats.highScore = stats.currentScore;
    }
    // Reset score:
    stats.currentScore = 0;
  }
  return false;
};

function wrapper(d){
  var context = this;

  d3.timer(function(){
    var enemyX = + d3.select(context).attr('cx');
    var enemyY = + d3.select(context).attr('cy');
    collisionDetection(d, enemyX, enemyY);

  });
};

setInterval(function(){
  var scores = [];
  stats.currentScore++;
  scores.push(stats.highScore, stats.currentScore, stats.collisionCount);
  d3.selectAll('span').data(scores).text(function(d){ return d; });
}, 100);

// ****** Cool ideas ******
// Create a boss enemy (using .force, .gravity?)
// point threshold tiers?
// implement difficulty tiers (e.g., hard mode, nightmare mode) that can be toggled on/off?
  // change enemy to somethng else for each level (whirling shuriken)
  // create a unique enemy for nightmare mode (the enemy that gravitates toward player?); "boss"
// reverse the game objective so instead of avoiding enemies, player tries to catch enemies, implement points multiplier?