var MAX_RADIUS = 80;

function Cell(pos, r, c) {
	this.lifeSpan = 0;
	//* In JavaScript, ANYTHING can be boolean evaluated.
	//* Any variable undefined gets evaluated to false.
	this.pos = pos || createVector(random(width), random(height));
	this.r = r || random(10, MAX_RADIUS);
	this.c = c || color(random(100,255), random(100,255), random(100,255), 127);
	
	this.move = function() {
		//* Grow, little cell.
		if (this.r < MAX_RADIUS && random(0,1) < 0.04) {
			this.r++;
		}
		var vel = p5.Vector.random2D();
		this.pos.add(vel);
		this.lifeSpan++;
	}
	
	this.clicked = function(x, y) {
		return dist(this.pos.x, this.pos.y, x, y) < this.r/2;
	}
	
	this.mitosis = function() {
		var cell = new Cell(createVector(this.pos.x + random(-this.r/4,this.r/4), this.pos.y + random(-this.r/4,this.r/4)), this.r/1.4, this.c);
		return cell;
	}
	
	this.show = function() {
		stroke(color(red(this.c), green(this.c), blue(this.c), 144));
		strokeWeight(3);
		fill(this.c);
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	}
}
