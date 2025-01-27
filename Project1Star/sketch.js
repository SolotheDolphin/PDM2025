function setup() {
  createCanvas(200, 200);
  colorMode(HSB);
}

function draw() {
  background(240, 100, 50);

  fill(0, 0, 100);
  circle(201, 203, 5);
  circle(-1, 203, 5);

  fill(120, 100, 50);
  stroke(0, 0, 100);
  strokeWeight(3);
  circle(100, 100, 100);

  fill(0, 100, 100);
  beginShape();
  vertex(100, 50);
  vertex(111, 84);
  vertex(148, 84);
  vertex(117.5, 105.5);
  vertex(128, 140);
  vertex(100, 118);
  vertex(72, 140);
  vertex(82.5, 105.5);
  vertex(52, 84);
  vertex(89, 84);
  endShape(CLOSE);

 
}
