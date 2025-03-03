let filter1, rever, polySynth, wetSlider, squareButton, triangleButton, sineButton, sawtoothButton;




let keyNotes1 = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'j': 'G4',
  'k': 'A4',
  'l': 'B4',
  ';': 'C5'
}



function setup() {
  createCanvas(400, 400);
  filter1 = new Tone.Filter(1500, "lowpass").toDestination();
  rever = new Tone.Reverb(2).connect(filter1);

  
  polySynth = new Tone.PolySynth(Tone.Synth).connect(rever);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    },
    oscillator: {
      type: 'triangle'
    }
  })
  polySynth.volume.value = -6;

  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 200);
  wetSlider.input(() => {rever.wet.value = wetSlider.value()});

  squareButton = createButton("Square");
  squareButton.position(200, 30);
  triangleButton = createButton("Triangle");
  triangleButton.position(200, 70);
  sawtoothButton = createButton("Sawtooth");
  sawtoothButton.position(10, 70);
  sineButton = createButton("Sine");
  sineButton.position(10, 30);

  squareButton.mousePressed(() => {polySynth.set({oscillator: {
    type: 'square'
  }
})})
  triangleButton.mousePressed(() => {polySynth.set({oscillator: {
    type: 'triangle'
  }
})})
  sawtoothButton.mousePressed(() => {polySynth.set({oscillator: {
    type: 'sawtooth'
  }
})})
  sineButton.mousePressed(() => {polySynth.set({oscillator: {
    type: 'sine'
  }
})})

}

function draw() {
  background(220);
  text("Reverb Wet Value: " + rever.wet.value, 215, 190);
  text("Switch Occilator:", 20, 20);
  text("Keys for Polysynth: a, s, d, f, j, k, l, ;", 20, 300);
}

function keyPressed() {
  let pitch1 = keyNotes1[key];
   if (pitch1) {
    polySynth.triggerAttack(pitch1);
  } 
}
function keyReleased() {
  let pitch1 = keyNotes1[key];
  if (pitch1) {
    polySynth.triggerRelease(pitch1);
  }
}