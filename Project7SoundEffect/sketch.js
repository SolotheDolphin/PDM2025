let noise1, noiseFilt, spaceDoor;
let show = false;

function preload() {
  spaceDoor = loadImage("media/openDoor.png");
}
function setup() {
  
  createCanvas(400, 400);
  imageMode(CENTER);

  noise1 = new Tone.Noise("pink");

  noiseFilt = new Tone.AutoFilter({
      frequency: 1
  }).toDestination().start();
  noise1.connect(noiseFilt);

  
}

function draw() {
  background(220);
  if (show){
    push();
    scale(0.5);
    translate(200, 200);
    image(spaceDoor, 200, 200);
    pop();
  }
}

function mouseClicked() {
  show = true;
  noise1.start().stop("+0.75");
}
