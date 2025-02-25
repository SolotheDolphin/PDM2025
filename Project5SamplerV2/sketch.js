let startContext, samples, birbButton, tigerButton, batButton, windButton, distortionSlider;


let distort = new Tone.Distortion(0).toDestination()


function preload() {
  samples = new Tone.Players({
    tiger: "media/tiger.mp3",
    grackle: "media/grackleFlock.mp3",
    bat: "media/crazyBat.mp3",
    wind: "media/windchime.mp3"
    
  }).connect(distort)
}

function setup() {
  createCanvas(400, 400);


  birbButton = createButton("Play Grackle Sample");
  birbButton.position(200, 30);
  tigerButton = createButton("Play Tiger Sample");
  tigerButton.position(200, 70);
  batButton = createButton("Play Wawawa Sample");
  batButton.position(10, 70);
  windButton = createButton("Play Windchime Sample");
  windButton.position(10, 30);

  birbButton.mousePressed(() => {samples.player("grackle").start()})
  tigerButton.mousePressed(() => {samples.player("tiger").start()})
  batButton.mousePressed(() => {samples.player("bat").start()})
  windButton.mousePressed(() => {samples.player("wind").start()})
  
  distortionSlider = createSlider(0, 10, 0, 0.01);
  distortionSlider.position(10, 200);
  distortionSlider.input(() => {distort.distortion = distortionSlider.value()});
 
}

function draw() {
  background(220);

  text("Distortion Amount: " + distortionSlider.value(), 15, 190);
  
}


