let green;
let round;
let jaguar;

let character;
let characterR;
let characterJ;


function preload() {
  green = loadImage("media/Green2.png");
  round = loadImage("media/round.png");
  jaguar = loadImage("media/jaguar.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  c1w = random(80, width-80), c1h = random(80, height-80);
  c2w = random(80, width-80), c2h = random(80, height-80);
  c3w = random(80, width-80), c3h = random(80, height-80);
  

  character = new Character(c1w,c1h);
  character.addAnimation("stand", new SpriteAnimation(green, 0, 0, 1));
  character.currentAnimation = "stand";
  character.addAnimation("left", new SpriteAnimation(green, 0, 0, 9));
  character.addAnimation("right", new SpriteAnimation(green, 0, 0, 9));

  characterJ = new Character(c2w,c2h);
  characterJ.addAnimation("stand", new SpriteAnimation(jaguar, 0, 0, 1));
  characterJ.currentAnimation = "stand";
  characterJ.addAnimation("left", new SpriteAnimation(jaguar, 0, 0, 9));
  characterJ.addAnimation("right", new SpriteAnimation(jaguar, 0, 0, 9));

  characterR = new Character(c3w,c3h);
  characterR.addAnimation("stand", new SpriteAnimation(round, 0, 0, 1));
  characterR.currentAnimation = "stand";
  characterR.addAnimation("left", new SpriteAnimation(round, 0, 0, 9));
  characterR.addAnimation("right", new SpriteAnimation(round, 0, 0, 9));
}

function draw() {
  background(220);
  characterR.draw();
  characterJ.draw();
  character.draw();
}

function keyPressed() {
  character.keyPressed();
  characterR.keyPressed();
  characterJ.keyPressed();
}

function keyReleased() {
  character.keyReleased();
 characterR.keyReleased();
  characterJ.keyReleased();
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down": 
          this.y += 2;
          break;
        case "left":
          this.x -= 2;
          break;
        case "right": 
          this.x += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        this.animations[this.currentAnimation].flipped = false;
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations[this.currentAnimation].flipped = true;
        break;
    }
  }
  
  keyReleased() {
    this.currentAnimation = "stand";
    this.animations[this.currentAnimation].flipped = false;
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.startV = startV;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0){
      this.u++;
      
    }

    if (this.u === this.startU + this.duration){
      this.u = this.startU;
    }
    
  }
}
