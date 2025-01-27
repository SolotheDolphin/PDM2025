function setup() {
  createCanvas(200, 200);
  colorMode(HSB);
}

function draw() {
  background(0, 0, 100);
  noStroke();
  fill(0, 100, 100, .4);
  circle(100, 75, 90);
  fill(250, 100, 100, .4);
  circle(75, 125, 90);
  fill(125, 100, 100, .4);
  circle(125, 125, 90);
}
