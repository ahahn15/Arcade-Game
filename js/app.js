// Enemies our player must avoid
var Enemy = function(id) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 1;
    this.y = 220 - (80 * id);
    this.speed = 120 + (100 * id);
    this.enemyId = id;
};

var numberOfEnemies = 3;

// Update the enemy's position, and check for a collision
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (dt * this.speed);
    this.checkForCollision(player);
    if (this.x > 600) {
        this.reset(this.enemyId);
    }
};

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 20;

Enemy.prototype.checkForCollision = function(player) {
   if (player.x < (this.x + ENEMY_WIDTH) && (player.x + PLAYER_WIDTH) > this.x &&
       player.y < (this.y + ENEMY_HEIGHT) && (PLAYER_HEIGHT + player.y) > this.y) {
        player.points -= 50;
        player.reset();
   }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function(id) {
    this.x = 10;
    this.y = 220 - 80 * (id);
};

var Player = function () {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 375;
    this.points = 500;
    this.endGame = false;
};

Player.prototype.update = function() {
    if (this.points <= 0) {
        this.lose();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const BOX_WIDTH = 100;
const BOX_HEIGHT = 80;
const TOP_BOUNDARY = -25;
const BOTTOM_BOUNDARY = 375;
const LEFT_BOUNDARY = 0;
const RIGHT_BOUNDARY = 400;

Player.prototype.handleInput = function(input) {
    if (input === 'left' && ((this.x - BOX_WIDTH) >= LEFT_BOUNDARY)) {
        this.x -= BOX_WIDTH;
    }
    else if (input === 'right' && ((this.x + BOX_WIDTH) <= RIGHT_BOUNDARY)) {
        this.x += BOX_WIDTH;
    }
    else if (input === 'up' && ((this.y - BOX_HEIGHT) >= TOP_BOUNDARY)) {
        this.y -= BOX_HEIGHT;
        if (this.y <= TOP_BOUNDARY) {
            this.points += 50;
            if (this.points >= 1000) {
                this.win();
            }
            this.reset();
        }
    }
    else if (input === 'down' && ((this.y + BOX_HEIGHT) <= BOTTOM_BOUNDARY)) {
        this.y += BOX_HEIGHT;
    }
    else {
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 375;
};

Player.prototype.win = function() {
    this.points += "       YOU WIN!";
    this.endGame = true;
};

Player.prototype.lose = function() {
    this.points += "       GAME OVER!";
    this.endGame = true;
};

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Instantiate our player and enemies
var player = new Player();

var allEnemies = [];
for (var i = 0; i < numberOfEnemies; i++)
{
    allEnemies.push(new Enemy(i));
}
