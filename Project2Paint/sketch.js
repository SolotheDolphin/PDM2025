
let inCanvas = false;
let color = 'white';

function setup() {
  createCanvas(1000, 500);
  background('white');
}

function draw() {
  strokeWeight(2);
  stroke(225);
  fill('red');
  square(0, 0, 25); //rojo
  fill('orange');
  square(0, 25, 25); //orange
  fill('yellow');
  square(0, 50, 25); //amarillo
  fill('green');
  square(0, 75, 25); //verde
  fill('cyan');
  square(0, 100, 25); //cyan
  fill('blue');
  square(0, 125, 25); //azul
  fill('magenta');
  square(0, 150, 25); //magenta
  fill('brown');
  square(0, 175, 25); //brown
  fill('white');
  square(0, 200, 25); //blanca
  fill('black');
  square(0, 225, 25); //black
  //strokeWeight(5);
  
}
function mousePressed(){
  if((mouseX >= 0 && mouseX <= 25 && mouseY <= 250)){
   mouseY < 25 ? color = 'red' : mouseY < 50 ? color = 'orange' :
   mouseY < 75 ? color = 'yellow' : mouseY < 100 ? color = 'green' :
   mouseY < 125 ? color = 'cyan' : mouseY < 150 ? color = 'blue' :
   mouseY < 175 ? color = 'magenta' : mouseY < 200 ? color = 'brown' :
   mouseY < 225 ? color = 'white' : color = 'black';
  } else {
    inCanvas = true;
  }
  if (inCanvas){
    stroke(color);
    strokeWeight(20);
    line(mouseX, mouseY, pmouseX, pmouseY);
  } 
}
function mouseDragged(){
 if (inCanvas){
    stroke(color);
    strokeWeight(20);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
  } 

}
function mouseReleased(){
  inCanvas = false;
}
