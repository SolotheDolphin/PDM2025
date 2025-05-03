//NOTES: use portWrite from here to make buttons light up
let port;
let toneButton, connectionButton, confirmButton, okButton; 
let finalPic, lvl1Pic, lvl2Pic, lvl3Pic, lvl4Pic, lvl5Pic, lvl6Pic, lvl7Pic;
let brightness = 0, red = 0, blue = 0, yellow = 0;
let memSynth, backgroundSynth1, backgroundSynth2, memSeq, backgroundSeq1, backgroundSeq2;
let redSynth, blueSynth, yellowSynth;

let canGo = false;
let progress;
let lvlDone = false;
let confirmColor = 'red';
let buttonColor = 'pink';

let time = 0;
let bufferTime = 0;
let countingTime = false;
let takenInput = false;

let colorSet = '';
let colorNum = 1;



let GameStates = Object.freeze({ 
  LEVEL_SELECT: "levelSelect",
  PLAYING: "playing",
  WRONG: "wrong",
  CORRECT: "correct",
  COMPLETE: "complete"
});
let Levels = Object.freeze({ 
  LEVEL1: "level1",
  LEVEL2: "level2",
  LEVEL3: "level3",
  LEVEL4: "level4",
  LEVEL5: "level5",
  LEVEL6: "level6",
  LEVEL7: "level7"
});
// Levels.LEVEL1
let levelHold = [Levels.LEVEL1, Levels.LEVEL2, Levels.LEVEL3, Levels.LEVEL4, Levels.LEVEL5, Levels.LEVEL6, Levels.LEVEL7];
let gameState = GameStates.LEVEL_SELECT;
let level = Levels.LEVEL1;

function preload() {
  finalPic = loadImage('media/LevelSelect.png');
  lvl1Pic = loadImage('media/Level1.png');
  lvl2Pic = loadImage('media/Level2.png');
  lvl3Pic = loadImage('media/Level3.png');
  lvl4Pic = loadImage('media/Level4.png');
  lvl5Pic = loadImage('media/Level5.png');
  lvl6Pic = loadImage('media/Level6.png');
  lvl7Pic = loadImage('media/Level7.png');
  progress = lvl1Pic;

  samples = new Tone.Players({
   blip: "media/blip.mp3",
   check: "media/check.mp3",
   incorrect: "media/incorrect.mp3"
  }).toDestination();
}

function setup() {
  createCanvas(600, 400);
  background(220);
  port = createSerial();
  connectionButton = createButton('Connect');
  connectionButton.mousePressed(connect);

  toneButton = createElement("button", "Start Audio");
  toneButton.mousePressed(() => {
    if (Tone.context.state !== "running") {
      Tone.start().then(() => {
        console.log("Context has started");
        Tone.Transport.start();
      })
    } else {
      Tone.Transport.start();
    }
  });
  //samples.player("blip").volume.value = 18;
  Tone.Transport.timeSignature = [4];
  Tone.Transport.bpm.value = 150;
  memSynth = new Tone.Synth().toDestination();
  backgroundSynth1 = new Tone.Synth().toDestination();
  backgroundSynth2 = new Tone.Synth().toDestination();
  redSynth = new Tone.Synth().toDestination();
  blueSynth = new Tone.Synth().toDestination();
  yellowSynth = new Tone.Synth().toDestination();
  
  
  memSeq = new Tone.Sequence((time, note) => {
    memSynth.triggerAttackRelease(note, "2n", time);
  }, ["F4", "G#4", ["F5", "F5"], ["C#5","C#5"], ["A#4","C#5"],
   ["A#4","G#4"], "C#5", "D#5", "A#4", ["F4", "F4"], ["F5", "F5"], ["C#5","C#5"], ["A#4","C#5"],
   ["A#4","G#4"], "G#4", "F4"], "6n");

   backgroundSeq1 = new Tone.Sequence((time, note) => {
    backgroundSynth1.triggerAttackRelease(note, "2n", time);
  }, [["C#5","G#4"], ["G#4", "C#5"], ["F5", null], "A#4", "A#5", 
  ["C#5","C#5"], "F5", "D#5"], "2n").start();

 
  
   backgroundSeq2 = new Tone.Sequence((time, note) => {
    backgroundSynth2.triggerAttackRelease(note, "2n", time);
  }, ["A#4", ["F5", "G#5"], ["C#6", null], ["F5", "G#5"],
   ["C#6", null], "G#5", ["F#5", "G#5"], ["A#5", "C#6"],

  "A#4", ["F5", "G#4"], "D#4", ["F5", "G#4"], "D#4", "G#5",
   ["F#5", "G#5"], ["C#5", "A#4"], 

  "A#4", ["F5", "G#5"], ["C#6", null], ["F5", "G#5"],
   ["C#6", null], "G#5", ["F#5", "G#5"], ["C#5", "A#4"],
  
  "A#4", ["F5", "G#4"], "D#4", ["F5", "G#4"], "D#4", "G#5",
   ["F#5", "G#5"], ["A#5", "C#6"]], "2n").start();


   
   redSynth.volume.value = -21;
   blueSynth.volume.value = -18;
   yellowSynth.volume.value = -24;
   backgroundSynth1.volume.value = -18;
   backgroundSynth2.volume.value = -12;
   memSynth.volume.value = -12;
 }




function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(18);
  fill('black');
  //if(canGo == true){
    let str = port.readUntil('\n');
    if (str !== "") {
      const values = str.split(',');
      if (values.length == 4) {
        brightness = brightness = map(Number(values[0]), 0, 1023, 0, 100); // over 50 = lighter/brighter; pink lime etc
        red = Number(values[1]); //1 = color, 0  b = none
        blue = Number(values[2]);
        yellow = Number(values[3]);
          if(red == 1){
            redSynth.triggerAttackRelease("C#5", "8n");
          }
          if(blue == 1){
            blueSynth.triggerAttackRelease("G#4", "8n");
          }
          if(yellow == 1){
            yellowSynth.triggerAttackRelease("F5", "8n");
        } 
        console.log(brightness + " " + red + " " + blue + " " + yellow);
      }
    }
  //}
  switch(gameState) {
    case GameStates.LEVEL_SELECT:
      if(frameCount % 60 == 0){
        bufferTime++;
      }
      //console.log("gothere");
      switch(level){
        case Levels.LEVEL1:
          progress = lvl1Pic;
          break;
        case Levels.LEVEL2:
          progress = lvl2Pic;
          break;
        case Levels.LEVEL3:
          progress = lvl3Pic;
          break;
        case Levels.LEVEL4:
          progress = lvl4Pic;
          break;
        case Levels.LEVEL5:
          progress = lvl5Pic;
          break;
        case Levels.LEVEL6:
          progress = lvl6Pic;
          break;
        case Levels.LEVEL7:
          progress = lvl7Pic;
          break;
      }
      push();
      scale(6);
      image(progress, 10, 0);
      pop();
      push();
      stroke('black');
      strokeWeight(5);
      fill('white');
      rect(width - 115 -2.5, height - 50 -2.5, 115, 50);
      noStroke();
      fill('black');
      text("NEXT LEVEL", width - 115/2 -2.5,height -50/2 -2.5);
      confirmColor = 'red';
      buttonColor = 'pink';
      pop();
      break;
    case GameStates.PLAYING:
      finishedLevel = false;
      text("pl", width/2,height/2);
      switch(level){
        case Levels.LEVEL1:
            currColor1 = 'white';
            currColor2 = 'grey';
          if (time <= 2){
          } else if (time <= 3){
            currColor1 = 'red';
          } else if (time <= 4){
            currColor1 = 'white';
            currColor2 = 'grey';
          } else if (time <= 5){
            currColor2 = 'blue';
          } else if (time > 5){
            time = 0;
            countingTime = false;
          }
            push();
            noStroke();
            fill(currColor1);
            rect(0, 0, width/2, height);
            fill(currColor2);
            rect(width/2, 0, width/2, height);
            pop();
          if (countingTime == true){
            text("MEMORIZE THE COLORS!", width/2, 12);
            backgroundSeq1.stop();
            backgroundSeq2.stop();
            memSeq.start();
          } else {
            if (colorNum == 1 && lvlDone == false){
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 2 && lvlDone == false) {
              canGo = true;
              setColors();
              takenInput = true;
            }
            if (canGo){
              text("WHAT WERE THE COLORS?", width/2, 12);
              backgroundSeq1.start();
              backgroundSeq2.start();
              memSeq.stop();
            } else {
              currColor1 = 'red';
              currColor2 = 'blue';
              push();
              noStroke();
              fill(currColor1);
              rect(0, 0, width/2, height);
              fill(currColor2);
              rect(width/2, 0, width/2, height);
              fill('white');
              rect(width/2 - 35, 0, 70, 25);
              pop();
              text("DONE?", width/2, 12);
              finishedLevel = true;
              colorNum = 1;
              lvlDone = true;
              takenInput = false;
              confirmColor = 'green';
              buttonColor = 'lime';
          // console.log(confirmColor);
          // gameState = GameStates.PLAYING;
            }
          }

          if (frameCount % 60 == 0 && countingTime == true){
            time++;
          }
          break;
        case Levels.LEVEL2:
          currColor1 = 'white';
            currColor2 = 'grey';
          if (time <= 2){
          } else if (time <= 3){
            currColor1 = 'orange';
          } else if (time <= 4){
            currColor1 = 'white';
            currColor2 = 'grey';
          } else if (time <= 5){
            currColor2 = 'purple';
          } else if (time > 5){
            time = 0;
            countingTime = false;
          }
            push();
            noStroke();
            fill(currColor1);
            rect(0, 0, width/2, height);
            fill(currColor2);
            rect(width/2, 0, width/2, height);
            pop();
          if (countingTime == true){
            text("MEMORIZE THE COLORS!", width/2, 12);
            backgroundSeq1.stop();
            backgroundSeq2.stop();
            memSeq.start();
          } else {
            if (colorNum == 1 && lvlDone == false){
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 2 && lvlDone == false) {
              canGo = true;
              setColors();
              takenInput = true;
            }
            if (canGo){
              text("WHAT WERE THE COLORS?", width/2, 12);
              backgroundSeq1.start();
              backgroundSeq2.start();
              memSeq.stop();
            } else {
              push();
              noStroke();
              fill('orange');
              rect(0, 0, width/2, height);
              fill('purple');
              rect(width/2, 0, width/2, height);
              fill('white');
              rect(width/2 - 35, 0, 70, 25);
              pop();
              text("DONE?", width/2, 12);
              finishedLevel = true;
              colorNum = 1;
              lvlDone = true;
              takenInput = false;
              confirmColor = 'green';
              buttonColor = 'lime';
            }
          }
          if (frameCount % 40 == 0 && countingTime == true){
            time++;
            finishedLevel = false;
          }
          break;
        case Levels.LEVEL3:
          currColor1 = 'white';
            currColor2 = 'grey';
          if (time <= 2){
          } else if (time <= 3){
            currColor1 = 'grey';
          } else if (time <= 4){
          } else if (time <= 5){
            currColor2 = 'white';
          } else if (time > 5){
            time = 0;
            countingTime = false;
          }
            push();
            noStroke();
            fill(currColor1);
            rect(0, 0, width/2, height);
            fill(currColor2);
            rect(width/2, 0, width/2, height);
            pop();
          if (countingTime == true){
            text("MEMORIZE THE COLORS!", width/2, 12);
            backgroundSeq1.stop();
            backgroundSeq2.stop();
            memSeq.start();
          } else {
            if (colorNum == 1 && lvlDone == false){
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 2 && lvlDone == false) {
              canGo = true;
              setColors();
              takenInput = true;
            }
            if (canGo){
              text("WHAT WERE THE COLORS?", width/2, 12);
              backgroundSeq1.start();
              backgroundSeq2.start();
              memSeq.stop();
            } else {
              push();
              noStroke();
              fill('grey');
              rect(0, 0, width/2, height);
              fill('white');
              rect(width/2, 0, width/2, height);
              rect(width/2 - 35, 0, 70, 25);
              pop();
              text("DONE?", width/2, 12);
              finishedLevel = true;
              colorNum = 1;
              lvlDone = true;
              takenInput = false;
              confirmColor = 'green';
              buttonColor = 'lime';
            }
          }
          if (frameCount % 40 == 0 && countingTime == true){
            time++;
            finishedLevel = false;
          }
          break;
        case Levels.LEVEL4:
          
          currColor1 = 'white';
            currColor2 = 'grey';
          if (time <= 2){
          } else if (time <= 3){
            currColor1 = 'black';
          } else if (time <= 4){
          } else if (time <= 5){
            currColor2 = 'yellow';
          } else if (time > 5){
            time = 0;
            countingTime = false;
          }
            push();
            noStroke();
            fill(currColor1);
            rect(0, 0, width/2, height);
            fill(currColor2);
            rect(width/2, 0, width/2, height);
            pop();
          if (countingTime == true){
            text("MEMORIZE THE COLORS!", width/2, 12);
            backgroundSeq1.stop();
            backgroundSeq2.stop();
            memSeq.start();
          } else {
            if (colorNum == 1 && lvlDone == false){
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 2 && lvlDone == false) {
              canGo = true;
              setColors();
              takenInput = true;
            }
            if (canGo){
              text("WHAT WERE THE COLORS?", width/2, 12);
              backgroundSeq1.start();
              backgroundSeq2.start();
              memSeq.stop();
            } else {
              push();
              noStroke();
              fill('black');
              rect(0, 0, width/2, height);
              fill('yellow');
              rect(width/2, 0, width/2, height);
              fill('white');
              rect(width/2 - 35, 0, 70, 25);
              pop();
              text("DONE?", width/2, 12);
              finishedLevel = true;
              colorNum = 1;
              lvlDone = true;
              takenInput = false;
              confirmColor = 'green';
              buttonColor = 'lime';
            }
          }
          if (frameCount % 30 == 0 && countingTime == true){
            time++;
            finishedLevel = false;
          }
          break;
        case Levels.LEVEL5:
          currColor1 = 'white';
            currColor2 = 'grey';
          if (time <= 2){
          } else if (time <= 3){
            currColor1 = 'lime';
          } else if (time <= 4){
          } else if (time <= 5){
            currColor2 = 'green';
          } else if (time > 5){
            time = 0;
            countingTime = false;
          }
            push();
            noStroke();
            fill(currColor1);
            rect(0, 0, width/2, height);
            fill(currColor2);
            rect(width/2, 0, width/2, height);
            pop();
          if (countingTime == true){
            text("MEMORIZE THE COLORS!", width/2, 12);
            backgroundSeq1.stop();
            backgroundSeq2.stop();
            memSeq.start();
          } else {
            if (colorNum == 1 && lvlDone == false){
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 2 && lvlDone == false) {
              canGo = true;
              setColors();
              takenInput = true;
            }
            if (canGo){
              text("WHAT WERE THE COLORS?", width/2, 12);
              backgroundSeq1.start();
              backgroundSeq2.start();
              memSeq.stop();
            } else {
              push();
              noStroke();
              fill('lime');
              rect(0, 0, width/2, height);
              fill('green');
              rect(width/2, 0, width/2, height);
              fill('white');
              rect(width/2 - 35, 0, 70, 25);
              pop();
              text("DONE?", width/2, 12);
              finishedLevel = true;
              colorNum = 1;
              lvlDone = true;
              takenInput = false;
              confirmColor = 'green';
              buttonColor = 'lime';
            }
          }
          if (frameCount % 30 == 0 && countingTime == true){
            time++;
            finishedLevel = false;
          }
          break;
        case Levels.LEVEL6:
          currColor1 = 'white';
          currColor2 = 'grey';
          currColor3 = 'white';
          if (time <= 2){
          } else if (time <= 3){
            currColor1 = 'pink';
          } else if (time <= 4){
          } else if (time <= 5){
            currColor2 = 'lime';
          } else if (time <= 6){
          } else if (time <= 7){
            currColor3 = 'cyan';
          } else if (time > 7){
            time = 0;
            countingTime = false;
          }
            push();
            noStroke();
            fill(currColor1);
            rect(0, 0, width/3, height);
            fill(currColor2);
            rect(width/3, 0, width/3, height);
            fill(currColor3);
            rect(width*2/3, 0, width/3, height);
            pop();
          if (countingTime == true){
            text("MEMORIZE THE COLORS!", width/2, 12);
            backgroundSeq1.stop();
            backgroundSeq2.stop();
            memSeq.start();
          } else {
            if (colorNum == 1 && lvlDone == false){
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 2 && lvlDone == false) {
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 3 && lvlDone == false) {
              canGo = true;
              setColors();
              takenInput = true;
            }
            if (canGo){
              text("WHAT WERE THE COLORS?", width/2, 12);
              backgroundSeq1.start();
              backgroundSeq2.start();
              memSeq.stop();
            } else {
              push();
              noStroke();
              fill('pink');
              rect(0, 0, width/3, height);
              fill('lime');
              rect(width/3, 0, width/3, height);
              fill('cyan');
              rect(width*2/3, 0, width/3, height);
              fill('white');
              rect(width/2 - 35, 0, 70, 25);
              pop();
              text("DONE?", width/2, 12);
              finishedLevel = true;
              colorNum = 1;
              lvlDone = true;
              takenInput = false;
              confirmColor = 'green';
              buttonColor = 'lime';
            }
          }
          if (frameCount % 20 == 0 && countingTime == true){
            time++;
            finishedLevel = false;
          }
          break;
        case Levels.LEVEL7:
          currColor1 = 'white';
          currColor2 = 'grey';
          currColor3 = 'white';
          currColor4 = 'grey';
          if (time <= 2){
          } else if (time <= 3){
            currColor1 = 'green';
          } else if (time <= 4){
          } else if (time <= 5){
            currColor2 = 'black';
          } else if (time <= 6){
          } else if (time <= 7){
            currColor3 = 'lime';
          } else if (time <= 8){
          } else if (time <= 9){
            currColor4 = 'brown';
          } else if (time > 9){
            time = 0;
            countingTime = false;
          }
            push();
            noStroke();
            fill(currColor1);
            rect(0, 0, width/4, height);
            fill(currColor2);
            rect(width/4, 0, width/4, height);
            fill(currColor3);
            rect(width*2/4, 0, width/4, height);
            fill(currColor4);
            rect(width*3/4, 0, width/4, height);
            pop();
          if (countingTime == true){
            text("MEMORIZE THE COLORS!", width/2, 12);
            backgroundSeq1.stop();
            backgroundSeq2.stop();
            memSeq.start();
          } else {
            if (colorNum == 1 && lvlDone == false){
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 2 && lvlDone == false) {
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 3 && lvlDone == false) {
              canGo = true;
              setColors();
              takenInput = true;
            } else if (colorNum == 4 && lvlDone == false){
              canGo = true;
              setColors();
              takenInput = true;
            }
            if (canGo){
              text("WHAT WERE THE COLORS?", width/2, 12);
              backgroundSeq1.start();
              backgroundSeq2.start();
              memSeq.stop();
            } else {
              push();
              noStroke();
              fill('green');
              rect(0, 0, width/4, height);
              fill('black');
              rect(width/4, 0, width/4, height);
              fill('lime');
              rect(width*2/4, 0, width/4, height);
              fill('brown');
              rect(width*3/4, 0, width/4, height);
              fill('white');
              rect(width/2 - 35, 0, 70, 25);
              pop();
              text("DONE?", width/2, 12);
              finishedLevel = true;
              colorNum = 1;
              lvlDone = true;
              takenInput = false;
              confirmColor = 'green';
              buttonColor = 'lime';
            }
          }
          if (frameCount % 10 == 0 && countingTime == true){
            time++;
            finishedLevel = false;
          }
          break;
      }
      if (canGo == true || finishedLevel == true){
        push();
        stroke(confirmColor);
        strokeWeight(5);
        fill(buttonColor);
        rect(width - 100 -2.5, height - 50 -2.5, 100, 50);
        noStroke();
        fill(confirmColor);
        text("CONFIRM", width - 100/2 -2.5,height -50/2 -2.5);
        pop();
      }
      break;
    case GameStates.WRONG:
      if (time < 3){
        push();
        noStroke();
        fill('pink');
        rect(0, 0, width, height);
        fill('red');
        text("WRONG!", width/2,height/2);
        pop();
      } else {
        canGo = false;
        time = 0;
        countingTime = true;
        gameState = GameStates.PLAYING;
      }
      if (frameCount % 60 == 0){
        time++;
      }
      break;
    case GameStates.CORRECT:
      if (time < 3){
        push();
        noStroke();
        fill('lime');
        rect(0, 0, width, height);
        fill('green');
        text("CORRECT!", width/2,height/2);
        pop();
        if(port.opened()){
          port.write('on\n');
        }
      } else {
        canGo = false;
        time = 0;
        gameState = GameStates.PLAYING;
      }
      if (frameCount % 60 == 0){
        time++;
      }
        break;
    case GameStates.COMPLETE:
      push();
      scale(6);
      image(finalPic, 10, 0);
      pop();
      push();
      noStroke();
      fill('white');
      rect(175, height - 25, 250, 25);
      pop();
      text("ALL LEVELS COMPLETED!", width/2, height - 12);
      break;
  }
}

function connect() {
  port.open('Arduino', 9600);
}

function setColors(){
  done = false;
  if (yellow == 1){
    if (blue == 1 && red == 1){
      colorSet = 'brown';
      done = true;
    } else if (red == 1){
      colorSet = 'orange';
      done = true;
    } else if (blue != 1) {
      colorSet = 'yellow';
      done = true;
    }
  } else {
    if (blue == 1 && red == 1){
      colorSet = 'purple';
      done = true;
    }
  }
  if (done == false){
    if (brightness < 50){
      if (red == 1 && blue == 0 && yellow == 0){
        colorSet = 'red';
        done = true;
      } 
      if (blue == 1 && yellow == 1 && red == 0){
        colorSet = 'green';
        done = true;
      }
      if (blue == 1 && yellow == 0 && red == 0){
        colorSet = 'blue';
        done = true;
      }
      if(done == false){
        if (brightness == 0){
          colorSet = 'black';
        } else {
          colorSet = 'grey';
        }
      }
    } else {
      if (blue == 1){
        if(yellow == 1 && red == 0){
          colorSet = 'lime';
        } else if (yellow == 0 && red == 0){
          colorSet = 'cyan';
        }
      } else {
        if (yellow == 0){
          if (red == 1){
            colorSet = 'pink';
          } else {
            colorSet = 'white';
          }
        }
      }
    }
  }
}

//startwith1
function testCorrect(num){
  switch(level){
    case Levels.LEVEL1:
      if(num == 1){
        //num = 2;
        if (colorSet == 'red'){
          return true;
        } else {
          return false;
        }
      } else if (num == 2) {
        if (colorSet == 'blue'){
          return true;
        } else {
          return false;
        }
      } else {
        return "";
      }
      break;
    case Levels.LEVEL2:
      if(num == 1){
        if (colorSet == 'orange'){
          return true;
        } else {
          return false;
        }
      } else if (num == 2) {
        if (colorSet == 'purple'){
          return true;
        } else {
          return false;
        }
      } else {
        return "";
      }
      break;
    case Levels.LEVEL3:
      if(num == 1){
        if (colorSet == 'grey'){
          return true;
        } else {
          return false;
        }
      } else if (num == 2) {
        if (colorSet == 'white'){
          return true;
        } else {
          return false;
        }
      } else {
        return "";
      }
      break;
    case Levels.LEVEL4:
      if(num == 1){
        if (colorSet == 'black'){
          return true;
        } else {
          return false;
        }
      } else if (num == 2) {
        if (colorSet == 'yellow'){
          return true;
        } else {
          return false;
        }
      } else {
        return "";
      }
      break;
    case Levels.LEVEL5:
      if(num == 1){
        if (colorSet == 'lime'){
          return true;
        } else {
          return false;
        }
      } else if (num == 2) {
        if (colorSet == 'green'){
          return true;
        } else {
          return false;
        }
      } else {
        return "";
      }
      break;
    case Levels.LEVEL6:
      if(num == 1){
        if (colorSet == 'pink'){
          return true;
        } else {
          return false;
        }
      } else if (num == 2) {
        if (colorSet == 'lime'){
          return true;
        } else {
          return false;
        }
      } else if(num == 3) {
        if (colorSet == 'cyan'){
          return true;
        } else {
          return false;
        }
      } else {
        return "";
      }
      break;
    case Levels.LEVEL7:
      if(num == 1){
        if (colorSet == 'green'){
          return true;
        } else {
          return false;
        }
      } else if (num == 2) {
        if (colorSet == 'black'){
          return true;
        } else {
          return false;
        }
      } else if(num == 3) {
        if (colorSet == 'lime'){
          return true;
        } else {
          return false;
        }
      } else if(num == 4) {
        if (colorSet == 'brown'){
          return true;
        } else {
          return false;
        }
      } else {
        return "";
      }
      break;
  }
}

///test

function mouseClicked(){
  if(gameState == GameStates.PLAYING){
    if(mouseX < width && mouseX > width - 100 && mouseY < height && mouseY > height - 50){
      samples.player("blip").start(); 
      //console.log(testCorrect());
      if(lvlDone == true){
       // console.log("here??");
        current = levelHold.indexOf(level);
        if (current < 6){
          level = levelHold[current + 1];
          //updateimage
          if(level == Levels.LEVEL4){
            Tone.Transport.bpm.rampTo(300, 120);
          }
          gameState = GameStates.LEVEL_SELECT;
          lvlDone = false;
        } else {
          gameState = GameStates.COMPLETE;
        }
      } else {
        if(takenInput == true){
          if (testCorrect(colorNum) == true){
            colorNum++;
            samples.player("check").start(); 
            gameState = GameStates.CORRECT; //then switch to next one and fill in
          } else if (testCorrect(colorNum) == false){
            gameState = GameStates.WRONG;// then switch back to this > GameStates.PLAYING
            samples.player("incorrect").start(); 
          } 
        }
      }
    }
  }
  if (gameState == GameStates.LEVEL_SELECT){
    if(bufferTime > 1){
      if(mouseX < width && mouseX > width - 110 && mouseY < height && mouseY > height - 50){
        samples.player("blip").start(); 
        //nextLevel

        countingTime = true;
        gameState = GameStates.PLAYING;
        bufferTime = 0;
      }
    }
  }
}
///////////////////////////////////////////////////////
// function keyTyped(){
//   if (canGo == true){
//     switch(key){
//       case '1':
//         brightness = 0;
//         break;
//       case '2':
//         brightness = 100;
//         break;
//       case '3':
//         red = 1;
//         break;
//       case '4':
//         red = 0;
//         break;
//       case '5':
//         blue = 1;
//         break;
//       case '6':
//         blue = 0;
//         break;
//       case '7':
//         yellow = 1;
//         break;
//       case '8':
//         yellow = 0;
//         break;
//       case '9':
//         brightness = 20;
//     }
//   }
// }
///testerbefore hardware
//key thing