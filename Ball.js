
function ball(vFast, vspeed, vx, vy, vwidth, vheight, vradius){
	this.fast = vFast;
	this.speed = vspeed ;
	this.radius = vradius;
	this.x = vx + Math.floor(Math.random()*(vwidth - 2 * this.radius));
	this.y = vy + Math.floor(Math.random()*(vheight - 2 * this.radius));
	this.angle = Math.floor(Math.random()*2*Math.PI);
	this.paint = paint;
	this.step = step;
	this.checkWallCollisions = checkWallCollisions;
	this.checkPaddleCollision = checkPaddleCollision;
	}
	
checkPaddleCollision = function (barY, barHeight) {
	if (this.angle<= 3*Math.PI/2 && this.angle >=Math.PI/2) {
		if (this.x <= 300 && this.x + this.radius >= 300 && barY + 103 - 7 <= this.y + this.radius && barY + barHeight + 103 + 7 >=this.y + this.radius)
			this.angle = 2*Math.PI - Math.PI * ((this.angle)/(Math.abs(this.angle))) - this.angle;
	}
	else {
		if (this.x + 2*this.radius >= 300 && this.x + this.radius <= 300 && barY + 103 - 7 <= this.y + this.radius && barY + barHeight + 103 + 7 >=this.y + this.radius)
			this.angle = 2*Math.PI - Math.PI * ((Math.PI - this.angle)/(Math.abs(Math.PI-this.angle))) - this.angle;
	}
}	
paint = function (canvasContext) {
	canvasContext.beginPath();
	canvasContext.moveTo(this.x + this.radius*2, this.y + this.radius);
	canvasContext.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI, false);
	if (this.fast) {
		canvasContext.fillStyle = "red";
	}
	else {
		canvasContext.fillStyle = "blue";
	}
	canvasContext.closePath();
	canvasContext.fill();
	canvasContext.strokeStyle = "black";
	canvasContext.stroke();
}

step = function () {
	this.y += Math.sin(this.angle) * this.speed;
	this.x += Math.cos(this.angle) * this.speed;
}

checkWallCollisions = function () {
		if (this.x+ 2*this.radius > 550) {
				this.angle = 2*Math.PI - Math.PI * ((Math.PI - this.angle)/(Math.abs(Math.PI-this.angle))) - this.angle;
		}
		else if (this.x < 50) {
			this.angle = 2*Math.PI - Math.PI * ((this.angle)/(Math.abs(this.angle))) - this.angle;
		}
		if (this.y <102 || this.y + 2*this.radius> 452) {
			this.angle = Math.PI - Math.PI * ((Math.PI - this.angle)/(Math.abs(Math.PI-this.angle))) - this.angle;
		}
		this.angle %= 2*Math.PI;
	}