const int BRIGHT_PIN = A0;
const int RED_PIN = 2; //WASanalogA1
const int BLUE_PIN = 3; //WAS sw
const int YELLOW_PIN = 4;

const int NUM_READINGS = 10;

const int LED_RED = 12;
const int LED_BLUE = 11;
const int LED_GREEN = 9;
const int LED_YELLOW = 10;

bool blueGoing = true;
bool redGoing = true;
bool yellowGoing = true;

int blueTime = 0;
int redTime = 0;
int yellowTime = 0;

int blueOn = 0;
int redOn = 0;
int yellowOn = 0;
// struct AxisReadings {
//   int readIndex;
//   int readings[NUM_READINGS];
//   float total = 0;
//   int average = 0;
//   int zeroed;

// } xAxisReadings, yAxisReadings;

// bool zeroing = false;
// bool ready = false;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);

  pinMode(BLUE_PIN, INPUT);//_PULLUP?
  pinMode(RED_PIN, INPUT);
  pinMode(YELLOW_PIN, INPUT);

  // for (int i = 0; i < NUM_READINGS; i++) {
  //   xAxisReadings.readings[i] = yAxisReadings.readings[i] = 0;
  // }
}

void loop() {




  
  // put your main code here, to run repeatedly:
  int brightValue = analogRead(BRIGHT_PIN); //not or not??? //!digitalRead(BLUE_PIN); make = 1 when pressed 
  int blueValue = digitalRead(BLUE_PIN);
  int redValue = digitalRead(RED_PIN);
  int yellowValue = digitalRead(YELLOW_PIN);
  if(blueValue != 0 && blueGoing == true){
    blueOn = toggleNum(blueOn);
    blueGoing = false;
  }
  if(blueGoing == false){
    blueTime++;
  }
  if (blueTime > 100){ //figureout this timing!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    blueGoing = true;
    blueTime = 0;
  }

  if(redValue != 0 && redGoing == true){
    redOn = toggleNum(redOn);
    redGoing = false;
  }
  if(redGoing == false){
    redTime++;
  }
  if (redTime > 100){ //figureout this timing!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    redGoing = true;
    redTime = 0;
  }

  if(yellowValue != 0 && yellowGoing == true){
    yellowOn = toggleNum(yellowOn);
    yellowGoing = false;
  }
  if(yellowGoing == false){
    yellowTime++;
  }
  if (yellowTime > 100){ //figureout this timing!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    yellowGoing = true;
    yellowTime = 0;
  }




  // if (zeroing) {
  //   xAxisReadings.zeroed = xAxisReadings.average;
  //   yAxisReadings.zeroed = yAxisReadings.average;
  //   zeroing = false;
  //   ready = true;
  // }
  int toAn;
  if(brightValue != 0 && brightValue < 512){
    toAn = map(brightValue, 0, 511, 0, 20);
  }else {
    toAn = brightValue;
  }
  analogWrite(LED_GREEN, toAn);/////////////////////////////////////////

  if(redOn == 1){
    digitalWrite(LED_RED, HIGH);
  } else {
    digitalWrite(LED_RED, LOW);
  }
  if(blueOn == 1){
    digitalWrite(LED_BLUE, HIGH);
  } else {
    digitalWrite(LED_BLUE, LOW);
  }
  if(yellowOn == 1){
    digitalWrite(LED_YELLOW, HIGH);
  } else {
    digitalWrite(LED_YELLOW, LOW);
  }


 // if (ready) {
    Serial.print(brightValue);
    Serial.print(",");
    Serial.print(redOn);
    Serial.print(",");
    Serial.print(blueOn);
    Serial.print(",");
    Serial.println(yellowOn);
 // }


  if(Serial.available() > 0) {   
    String msg = Serial.readStringUntil('\n');
    if (msg == "on") {
        digitalWrite(LED_BLUE, HIGH);
        digitalWrite(LED_RED, HIGH);
        digitalWrite(LED_YELLOW, HIGH);
        digitalWrite(LED_GREEN, HIGH);
    } 
  }


  delay(16);
}
int toggleNum(int ret){
  if(ret == 1){
    ret = 0;
  } else {
    ret = 1;
  }
  return ret;
}
// void smoothAxis(AxisReadings *readings, int newValue) {
//   int index = readings->readIndex;
//   readings->total = readings->total - readings->readings[index];
//   readings->readings[index] = newValue;
//   readings->total += newValue;
//   readings->readIndex = readings->readIndex + 1;

//   if (readings->readIndex >= NUM_READINGS)
//     readings->readIndex = 0;

//   readings->average = round(readings->total / NUM_READINGS);
// }

