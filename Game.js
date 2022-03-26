interval = 100.0/6.0;
canvas=null;
canvasContext=null;
devilUp = new Image(); 
devilDown = new Image();
barrierRaised = false;
level = 1;
radius = 31 - level;
fastSpeed = 2 * level;
slowSpeed = level;
fastBalls = null;
slowBalls = null;
upIsPressed = false;
downIsPressed = false;
barY = 0;
barHeight = 50;
armsUp = false;
winCheckCounter = 0;
ballCounter = 1;
timer = null;

Initialize = function () {
	document.getElementById('music1').volume = .007;
	canvas = document.getElementById('thegame');
	canvasContext = canvas.getContext('2d');
	devilUp.src = "image/devil_up.png";
	devilDown.src = "image/devil_down.png";
	document.onkeyup = keyCheckUp;
	document.onkeydown = keyCheckDown;
	document.onkeypress = hasWonCheck;
	generateBalls(); //lol
	timer = setInterval(RunGameLoop, interval);
}

checkForWin = function() {
	for (var i = 0; i < ballCounter; i++) {
		if (slowBalls[i].x < 300)
			return false;
		if (fastBalls[i].x > 300)
			return false;
	}
	return true;
}

hasWonCheck = function (e) {
	if (event.keycode == 32 || e.keyCode == 32) {
		if (checkForWin()) {
			levelWin();
		}
		else {
			winCheckCounter++;
			if (winCheckCounter > level + 2) {
				alert("Entropy Overload. System Reset.");
					level = 1;
					winCheckCounter = 0;
					armsUp=false;
					radius = (31 - level >9)? 31 -level : 10;
					fastSpeed = (level/2.0 < 6) ? level/2.0 : 6;
					slowSpeed = fastSpeed / 2.0;
					ballCounter = 1;
					generateBalls();
			}
		}
	}
}
keyCheckUp = function (e) {
	if (event.keycode == 38 || e.keyCode == 38) {
		armsUp=false;
		upIsPressed = false;
	}
	if (event.keycode == 40 || e.keyCode == 40) {
		armsUp=false;
		downIsPressed = false;
	}
}

keyCheckDown = function (e) {
	if (event.keycode == 38 || e.keyCode == 38) {
		armsUp=true;
		upIsPressed = true;
	}
	if (event.keycode == 40 || e.keyCode == 40) {
		armsUp=true;
		downIsPressed = true;
	}
}

generateBalls = function () {
	fastBalls = new Array();
	for (var i = 0; i < ballCounter; i++) {
		if (i % 2 == 0)
			fastBalls[i] = new ball(true, fastSpeed, 52,104, 248,348, radius);
		else
			fastBalls[i] = new ball(true, fastSpeed, 302,104, 248,348, radius);
	}
	slowBalls = new Array();
	for (var i = 0; i < ballCounter; i++) {
		if (i % 2 == 0)
			slowBalls[i] = new ball(false, slowSpeed, 302,104, 248,348, radius);
		else
			slowBalls[i] = new ball(false, slowSpeed, 52,104, 248,348, radius);
	}
}

levelWin = function () {
	level++;
	winCheckCounter = 0;
	armsUp=false;
	radius = (31 - level >9)? 31 -level : 10;
	fastSpeed = (level/2.0 < 6) ? level/2.0 : 6;
	slowSpeed = fastSpeed / 2.0;
	ballCounter = Math.round(Math.sqrt(level));
	generateBalls();
}

RunGameLoop = function () {
	Update();
	Draw();
}

Update = function () {
	if (upIsPressed && barY >0) {
		barY-=5;
	}
	if (downIsPressed && barY + barHeight< 348) {
		barY+=5;
	}
	
	for (var i = 0; i < ballCounter; i++) {
		slowBalls[i].step();
		fastBalls[i].step();
	}
	for (var i = 0; i < ballCounter; i++) {
		slowBalls[i].checkWallCollisions();
		fastBalls[i].checkWallCollisions();
		slowBalls[i].checkPaddleCollision(barY, barHeight);
		fastBalls[i].checkPaddleCollision(barY, barHeight);	
	}
}

overlap = function(ball1, ball2) {
	return (ball1.radius + ball2.radius)*(ball1.radius + ball2.radius) <= (ball1.x+ball1.radius - ball2.x-ball2.radius)*(ball1.x+ball1.radius - ball2.x-ball2.radius) + (ball1.y+ball1.radius - ball2.y-ball2.radius)*(ball1.y+ball1.radius - ball2.y-ball2.radius)
}

Draw = function () {
	canvas.width = canvas.width;
	canvasContext.strokeStyle = "red";
	canvasContext.strokeRect(50,102, 250,350);
	canvasContext.strokeStyle = "blue";
	canvasContext.strokeRect(300,102, 250,350);
	if (armsUp) {
		canvasContext.drawImage(devilUp,250,0,104,100);
	}
	else {
		canvasContext.drawImage(devilDown,250,0,104,100);
	}
	canvasContext.fillStyle = "white";
	canvasContext.fillRect(298,103,5,348);
	canvasContext.fillStyle = "black";
	canvasContext.fillRect(298, barY + 103, 3, barHeight);
	for (var i = 0; i < ballCounter; i++) {
		slowBalls[i].paint(canvasContext);
		fastBalls[i].paint(canvasContext);
	}
	canvasContext.fillStyle = "black";
	canvasContext.fillText("Level: " + level, 10, 20);
	canvasContext.fillText("Entropy Checks Remaining: " + (level + 2 - winCheckCounter),10, 40);
}
