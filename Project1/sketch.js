function setup() {
  createCanvas(windowWidth, windowHeight); //size 
  colorMode(HSB); //switch between hsb and rgb
  angleMode(DEGREES);
}

function draw() {
  background(0, 50, 100); 
  fill(0);
  noStroke();//no outline on anything
  square(100, 100, 100); //0,0 is the top left; specifies where top left corner of the square is
  fill(0, 100, 100);//everything after this point is red, but if previous is not specified, it will fill that too
  circle(125, 125, 25);//specifies where the center of the circle is; give diameter of circle
  circle(175, 125, 25);
  arc(150, 166, 75, 25, 0, 180);
  //specifies where the center is; position, width, height, angle of start and end(default is radians)
 
  fill(50, 50, 50, .5);//opaqueness
  stroke('orange'); //can use numbers too
  strokeWeight(5);
  beginShape();
  vertex(100, 100);
  vertex(75, 75);
  vertex(125, 125);
  vertex(320, 125);
  endShape(CLOSE);//whether connect last point to first point
}