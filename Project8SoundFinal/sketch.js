//make a clear background thing> pop sound
//pop sound for selected color + color theme when drawing the color
//+background sound +sound2 as time goes on
//brush sound everytime you start drawing

///ASK ABOUT HOW TO DETECT COLOR???

let seq1, synth1, synthC1, seqC1, synth2, synth3, rainSeq, synth4, crystalSeq;
let orange, yellow, red, white, magenta, green, brown, blue, black, cyan;

let inCanvas = false;
let color = null;
let f = 4;
let g = 14;
let drawing = false;
let strokes = 0;





function preload() {
  samples = new Tone.Players({
   blip: "media/blip.mp3",
   brush: "media/brush.mp3",
   pop: "media/pop.mp3"
  }).toDestination();
}

function setup() {
  samples.player("blip").volume.value = 18;
  samples.player("brush").volume.value = 18;
  samples.player("pop").volume.value = 24;
  createCanvas(1000, 500);
  background(220);
  button = createElement("button", "Start Audio");
  button.position(30, 0);
  button.mousePressed(() => {
    samples.player("blip").start(); 
    if (Tone.context.state !== "running") {
      Tone.start().then(() => {
        console.log("Context has started");
        Tone.Transport.start();
      })
    } else {
      Tone.Transport.start();
    }
  });
  Tone.Transport.timeSignature = [4];
  Tone.Transport.bpm.value = 290;
 
  synth1 = new Tone.Synth().toDestination();
  synthC1 = new Tone.Synth().toDestination();
  synth2 = new Tone.Synth().toDestination();
  synth3 = new Tone.Synth().toDestination();
  synth4 = new Tone.Synth().toDestination();

  seq1 = new Tone.Sequence((time, note) => {
    synth1.triggerAttackRelease(note, "2n", time);
  }, ["B4", null, null, "A4", null, null, "A4", null,
   "E4", "B4", "A4", "B4", "F#4", ["F#4","E4"], "E4", "A4",

  "B4", null, null, "A4", null, "B4", null, "D5",
   null, "B4", "A4", "B4", "F#4", ["F#4","E4"], "E4", "A4",

  "D3", "F#4", null, "A4"/*F#4*/, null, null, "B4", "D3",
   "E4", "B4", "A4", "B4", "B4", ["D5","E5"], "B4"/*F#4*/, "B4"/*F#4*/,
  
  "B4", null, "D5", null, "E5", null, "A4", "F#4",
   null, "B4", "A4", "B4", "F#4", ["F#4","E4"], "E4", "A4"], "4n").start();

  seqC1 = new Tone.Sequence((time, note) => {
    synthC1.triggerAttackRelease(note, "2n", time);  
  }, [null, null, null, null, null, null, "F#4", null,
  null, "F#4", null, "F#4", "E4", ["E4","D3"], null, "D3",

  null, null, null, null, null, null, null, "B4",
  null, "F#4", null, "F#4", "E4", ["E4","D3"], null, "D3",

  null, null, null, "F#4", null, null, null, null,
  null, "F#4", null, "F#4", null, ["B4","D5"], "F#4", "F#4",
  
  null, null, null, null, null, null, null, null,
  null, "F#4", null, "F#4", "E4", ["E4","D3"], null, "D3"], "4n").start();

  

  rainSeq = new Tone.Sequence((time, note) => {
    synth3.triggerAttackRelease(note, "2n", time);
  }, ["E3", "A3", "E3", "A3", "E3", "F#3", "E3", "F#3", 
    "E3", "A3", "E3", "A3", "E3", "F#3", "E3", "F#3"], "4n");
  crystalSeq = new Tone.Sequence((time, note) => {
    synth4.triggerAttackRelease(note, "1n", time);
  }, ["A2", "D3", "F#2", "B2", [null, "A2"],
   "A2", "D3", "A2"], "4n");

//COLOR SEQUENCES
orange = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["D6", "D6", "F#5", "D6", ["E7", null], "D6",
["B5", null], "A5"], "2n");

yellow = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["D6", "E7", "F#5", ["D6", "E7"], ["F#7", null],
 "D6", ["B5", null], ["A5", "F#5"]], "2n");

red = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["D6", ["B5","A5"], "F#5", "D6", ["A5", null],
["A5", "B5"], [null, "A5"], ["E5", null]], "2n");

white = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["D6", ["D6", null], "F5#", ["E7", null], "F#7",
 [null,"A5"], null, ["A5","F#5"]], "2n");

magenta = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["A5", "D6", "F#5", ["A5", "F#5"], ["B5", "D6"],
"F#7", ["B5", null], ["A5", "F#5"]], "2n");

green = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["A5", "B5", ["D6", "E7"], "D6", ["B5", "A5"],
"F#5", "B5", ["A5","F#5"]], "2n");

brown = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["A5", "A5", null, "F#5", ["A5", "B5"], [null,"D6"],
"B5", ["F#5", "E5"]], "2n");

blue = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["E5", "F#5", "A5", "F#5", [null, "F#5"], [null,
   "A5"], [null, "F#5"], ["F#5", "E5"]], "2n");

black = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["E5", "F#5", "D5", ["D5", "A5"], "B5", null,
["A5", null], ["F#5", "E5"]], "2n");

cyan = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["E5", "A5", ["A5", null], "F#5", [null, "B5"],
"A5", [null, "B5"], "D5"], "2n");



}






function draw() {

 synth3.volume.value = -6;
 synth4.volume.value = -6;

   if(strokes > f){
    seq1.stop();
    seqC1.stop();
    rainSeq.start();
    seq1.start();
    seqC1.start();
    f = 100000;
  } 
  if(strokes > g){
    seq1.stop();
    seqC1.stop();
    rainSeq.stop();
    crystalSeq.start();
    seq1.start();
    seqC1.start();
    g = 100000;
  } 

  
  strokeWeight(2);
  stroke(225);
  fill('red');
  square(0, 0, 25); //rojo //up
  fill('orange');
  square(0, 25, 25); //orange //up
  fill('yellow');
  square(0, 50, 25); //amarillo //up
  fill('green');
  square(0, 75, 25); //verde //mid
  fill('cyan');
  square(0, 100, 25); //cyan //down
  fill('blue');
  square(0, 125, 25); //azul //down
  fill('magenta');
  square(0, 150, 25); //magenta //mid
  fill('brown');
  square(0, 175, 25); //brown //mid
  fill('white');
  square(0, 200, 25); //blanca //up
  fill('black');
  square(0, 225, 25); //black //down
  //strokeWeight(5);
}

function mousePressed(){
  synth1.volume.rampTo(-9, 2);
  synthC1.volume.rampTo(-9, 2);
  synth3.volume.rampTo(-24, 2);
  synth4.volume.rampTo(-18, 2);

  //samples.player("drop1").start(); BRUSH SOUND
  if((mouseX >= 0 && mouseX <= 25 && mouseY <= 250)){
   mouseY < 25 ? color = 'red' : mouseY < 50 ? color = 'orange':
   mouseY < 75 ? color = 'yellow' : mouseY < 100 ? color = 'green' :
   mouseY < 125 ? color = 'cyan' : mouseY < 150 ? color = 'blue' :
   mouseY < 175 ? color = 'magenta' : mouseY < 200 ? color = 'brown' :
   mouseY < 225 ? color = 'white' : color = 'black';
   samples.player("pop").start(); 
   
  } else {
    inCanvas = true;
  }
  color === 'red' ? red.start() : color === 'orange' ? orange.start():
  color === 'yellow' ? yellow.start() : color === 'green' ? green.start() :
  color === 'cyan' ? cyan.start() : color === 'blue' ? blue.start() :
  color === 'magenta' ? magenta.start() : color === 'brown' ? brown.start() :
  color === 'white' ? white.start() : color === 'black' ? black.start(): f = f;

  if (inCanvas){
    stroke(color);
    strokeWeight(20);
    line(mouseX, mouseY, pmouseX, pmouseY);
    samples.player("brush").start(); 
    strokes++;
  } 
 
}
function mouseDragged(){
 if (inCanvas){
    stroke(color);
    strokeWeight(20);
    line(mouseX, mouseY, pmouseX, pmouseY);
    drawing = true;
  } else {
    drawing = false;
  }

}
function mouseReleased(){
  inCanvas = false;
  drawing = false;

  synth1.volume.rampTo(0, 3);
  synthC1.volume.rampTo(0, 3);
  synth1.volume.rampTo(0, 3);
  synthC1.volume.rampTo(0, 3);
  synth3.volume.rampTo(-6, 3);
  synth4.volume.rampTo(-6, 3);
  


  color === 'red' ? red.stop() : color === 'orange' ? orange.stop():
  color === 'yellow' ? yellow.stop() : color === 'green' ? green.stop() :
  color === 'cyan' ? cyan.stop() : color === 'blue' ? blue.stop() :
  color === 'magenta' ? magenta.stop() : color === 'brown' ? brown.stop() :
  color === 'white' ? white.stop() :color === 'black' ? black.stop(): f = f;

 
}
