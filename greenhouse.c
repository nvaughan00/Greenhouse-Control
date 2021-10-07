#include <DHT.h>

#define DHTPIN 5
#define DHTTYPE DHT22 
#define misters 2
#define fan 3
#define heatLamp 4

DHT dht(DHTPIN, DHTTYPE);

void setup(){
  Serial.begin(9600);
  pinMode(misters, OUTPUT);
  pinMode(fan, OUTPUT);
  pinMode(heatLamp, OUTPUT);
  dht.begin();
}

void loop(){
  checkHumidityAndAdjustMisters();
  checkTemperatureAndAdjustFan();
  checkTemperatureAndAdjustHeatLamp();
  delay(5000);
}


//This uses a relay so output logic is swapped
void checkHumidityAndAdjustMisters() {
  Serial.println(dht.readHumidity());
  if (dht.readHumidity() >= 80) {
    digitalWrite(misters, HIGH);
  }
  else {
    digitalWrite(misters, LOW);
  }
}

void checkTemperatureAndAdjustFan() {
  int f = (dht.readTemperature() * (1.8)) + 28;
  Serial.println(f);
  if (f >= 80) {
    digitalWrite(fan, HIGH);
  }
  else {
    digitalWrite(fan, LOW);
  }
}

//This uses a relay so output logic is swapped
void checkTemperatureAndAdjustHeatLamp() {
  int f = (dht.readTemperature() * (1.8)) + 32;
  if (f > 70) {
    digitalWrite(fan, HIGH);
  }
  else {
    digitalWrite(fan, LOW);
  }
}
   
