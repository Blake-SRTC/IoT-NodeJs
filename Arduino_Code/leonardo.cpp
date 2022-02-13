/*

*/
int lightPin1 = 2;
int lightPin2 = 4;
int lightPin3 = 7;

void setup() {
  
  pinMode(lightPin1, OUTPUT);
  pinMode(lightPin2, OUTPUT);
  pinMode(lightPin3, OUTPUT);
  Serial.begin(9600);
  
}

void loop() {
  
  if(Serial.available() > 0) {
    
    String receivedString = "";
    
    while(Serial.available() > 0) {
      
      receivedString += char(Serial.read());
      
    }
    
    if(receivedString == "1")
      digitalWrite(lightPin1, HIGH);
    else if(receivedString == "2")
      digitalWrite(lightPin1, LOW);
    else if(receivedString == "3")
      digitalWrite(lightPin2, HIGH);
    else if(receivedString == "4")
      digitalWrite(lightPin2, LOW);
    else if(receivedString == "5")
      digitalWrite(lightPin3, HIGH);
    else if(receivedString == "6")
      digitalWrite(lightPin3, LOW);
  }
    
}