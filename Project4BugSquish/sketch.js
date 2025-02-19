let bug;
//let fakeBug;
let bug1;
let bug2;
let bug3;
let bug4; 
let bug5;
let bug6;
let bug7;
let bug8;
let bug9;
let bug10;
let bug11;
let bug12;
let bug13;
let bug14;
let bug15;
let allBugs = [];
let time = 30;
let speed = 1;
let calmness = 3;



function preload() {
  bug = loadImage("media/daBug.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);
  textSize(30); 
  //fakeBug = new buggies;

  bug1 = new buggies;
  bug2 = new buggies;
  bug3 = new buggies;
  bug4 = new buggies;
  bug5 = new buggies;
  bug6 = new buggies;
  bug7 = new buggies;
  bug8 = new buggies;
  bug9 = new buggies;
  bug10 = new buggies;
  bug11 = new buggies;
  bug12 = new buggies;
  bug13 = new buggies;
  bug14 = new buggies;
  bug15 = new buggies;


  allBugs[0] = bug1;
  allBugs[1] = bug2;
  allBugs[2] = bug3;
  allBugs[3] = bug4;
  allBugs[4] = bug5;
  allBugs[5] = bug6;
  allBugs[6] = bug7;
  allBugs[7] = bug8;
  allBugs[8] = bug9;
  allBugs[9] = bug10;
  allBugs[10] = bug11;
  allBugs[11] = bug12;
  allBugs[12] = bug13;
  allBugs[13] = bug14;
  allBugs[14] = bug15;

}
class buggies {
  constructor(buggo) {
    let bugo;
    bugo = new Character(random(80, width-80),random(80, height-80));
    bugo.addAnimation("down", new SpriteAnimation(bug, 0, 0, 9));
    bugo.addAnimation("up", new SpriteAnimation(bug, 0, 0, 9));
    bugo.addAnimation("stand", new SpriteAnimation(bug, 2, 0, 1));
    bugo.currentAnimation = "stand";
    bugo.addAnimation("left", new SpriteAnimation(bug, 0, 0, 9));//start collmn, row, duration
    bugo.addAnimation("right", new SpriteAnimation(bug, 0, 0, 9));
    bugo.addAnimation("splat", new SpriteAnimation(bug, 9, 0, 1));
    this.buggo = bugo;
  }
}

function draw() {
  //console.log("length:" + allBugs.length);
  background('pink');
  text("Time: " + time, 275, 30);
  allBugs.length == 14 ? speed = 1.5: allBugs.length == 13 ? speed = 1.75: 
  allBugs.length == 12 ? speed = 2: allBugs.length == 11 ? speed = 2.25: 
  allBugs.length == 10 ? speed = 2.5: allBugs.length == 9 ? speed = 2.75: 
  allBugs.length == 8 ? speed = 3: allBugs.length == 7 ? speed = 3.25: 
  allBugs.length == 6 ? speed = 3.5: allBugs.length == 5 ? speed = 3.75: 
  allBugs.length == 4 ? speed = 4: allBugs.length == 3 ? speed = 4.5: 
  allBugs.length == 2 ? speed = 5: allBugs.length == 1 ? speed = 6: 
  speed = 1;
  for (i = 0; allBugs.length > i; i++){
  allBugs[i].buggo.draw();
  }

  if(time == 0){
    noLoop();
   }
  if(frameCount % 60 == 0){
    time--; 
  }
}

function mouseClicked(){
  bug1.buggo.mouseClicked();
  bug2.buggo.mouseClicked();
  bug3.buggo.mouseClicked();
  bug4.buggo.mouseClicked();
  bug5.buggo.mouseClicked();
  bug6.buggo.mouseClicked();
  bug7.buggo.mouseClicked();
  bug8.buggo.mouseClicked();
  bug9.buggo.mouseClicked();
  bug10.buggo.mouseClicked();
  bug11.buggo.mouseClicked();
  bug12.buggo.mouseClicked();
  bug13.buggo.mouseClicked();
  bug14.buggo.mouseClicked();
  bug15.buggo.mouseClicked();
}



class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
    this.squished = false;
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }
  directional(){

    let currDirection = Math.round(random(0, 3.5));
    //console.log(currDirection);
    //let going = "stand";

    let going = "stand";
    // if (time%calmness == 0)
    
    if (this.squished){
      going = "splat";
    } else{
       if (currDirection == 0){
        going = "up";
      } else if (currDirection == 1) {
        going = "right";
      } else if (currDirection == 2) {
        going = "left";
      } else {
        going = "down";
      } 
    }
    this.currentAnimation = going;
  }
  mouseClicked(){
  
  if ((this.x - 20 < mouseX && mouseX < this.x+20)&&(this.y - 20 < mouseY && mouseY < this.y+20)){
    this.squished = true;
  }
  }
  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= speed;
          this.animations[this.currentAnimation].flipped = false;
          this.animations[this.currentAnimation].isLeft = false;
          this.animations[this.currentAnimation].isRight = false;
          break;
        case "down": 
          this.y += speed;
          this.animations[this.currentAnimation].flipped = true;
          this.animations[this.currentAnimation].isLeft = false;
         this.animations[this.currentAnimation].isRight = false;
          break;
        case "left":
          this.x -= speed;
          this.animations[this.currentAnimation].isLeft = true;
          this.animations[this.currentAnimation].flipped = false;
          this.animations[this.currentAnimation].isRight = false;
          break;
        case "right": 
          this.x += speed;
          this.animations[this.currentAnimation].isRight = true;
          this.animations[this.currentAnimation].isLeft = false;
          this.animations[this.currentAnimation].flipped = false;
          break;
        case "splat":
          break;
      }
      if (this.x < 20){
        this.x = 20;
      } else if (this.x > width -20){
        this.x = width -20;
      }
      if (this.y < 20){
        this.y = 20;
      } else if (this.y > height -20){
        this.y = height -20;
      }

      this.directional();

      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
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
    this.isLeft = false;
    this.isRight = false;
  }

  draw() {
    
    let downD = (this.flipped) ? 180 : 0;
    let leftD = (this.isLeft) ? -90 : 0;
    let rightD = (this.isRight) ? 90 : 0;
    rotate(downD);
    rotate(leftD);
    rotate(rightD);
    

    image(this.spritesheet, 0, 0, 40, 40, this.u*40, this.v*40, 40, 40);

    this.frameCount++;
    if (this.frameCount % 10 === 0){
      this.u++;
      
    }

    if (this.u === this.startU + this.duration){
      this.u = this.startU;
    }
    
  }
}
