var cells = [];
var initialCellCount = 20;
var oldAge = 300;
var lastCreatedMouseX = 0;
var lastCreatedMouseY = 0;

function setup() {
	createCanvas(700, 700);
	for (var i = 0; i < initialCellCount; i++) {
		var cell = new Cell();
		cells.push(cell);
	}
}

function draw() {
	background(70);

	noStroke();
	textSize(21);
	fill(100, 200, 100);
	text("cell count " + cells.length, 10, 20);
	text("left click = produce, right-click = kill", 10, height - 20);
	
	for (var i = cells.length - 1; i >= 0; i--) {
		cells[i].move();
		cells[i].show();
		if (random(0,1) < 0.0001) {
			//* There's a very small chance a new cell will spontaneously appear.
			var cell = new Cell();
			cells.push(cell);
		}
		if (cells[i].lifeSpan > oldAge)
		{
			//* Our cell is getting pretty old. There's a small chance it'll die of old age.
			if (random(0,1) < 0.0002) {
				cells.splice(i, 1);
				continue;
			}
			//* But there's also a very small chance the old guy'll spontaneously undergo mitosis.
			if (random(0,1) < 0.00001) {
				doMitosis(i);
				continue;
			}
		}
	}
}

function mousePressed() {
	var anyCellsSplit = false;
	for (var i = cells.length - 1; i >= 0; i--) {
		if (cells[i].clicked(mouseX, mouseY)) {
			if (mouseButton == LEFT)
			{
				//* Left click splits the cell.
				doMitosis(i);
				anyCellsSplit = true;
			}
			if (mouseButton == RIGHT)
			{
				//* Right click kills the cell.
				cells.splice(i, 1);
				//* We'll just kill one.
				return;
			}
		}
	}
	if (anyCellsSplit == false && mouseButton == LEFT)
	{
		//* No cells split, so we must have clicked on blank space.
		//* First of all, debounce the click or we'll be creating cells out of control.
		if (mouseX == lastCreatedMouseX && mouseY == lastCreatedMouseY) {
			return;
		}
		//* Blank space clicked on. Create a new cell at this point.
		var lastCreatedMouseX = mouseX;
		var lastCreatedMouseY = mouseY;
		var cell = new Cell(createVector(lastCreatedMouseX, lastCreatedMouseY));
		cells.push(cell);
	}
}

function doMitosis(cellIndex) {
	cells.push(cells[cellIndex].mitosis());
	cells.push(cells[cellIndex].mitosis());
	cells.splice(cellIndex, 1);
}