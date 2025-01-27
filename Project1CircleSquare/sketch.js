function setup() {
  createCanvas(200, 100);
  colorMode(HSB);
}

function draw() {
  background(100, 76, 95);
  fill(0, 0, 100);
  strokeWeight(1);
  stroke('black');
  circle(50, 50, 75);
  circle(150, 50, 20);
  square(112.5, 12.5, 75);
}