const sql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const helmet = require('helmet');
require("babel-core").transform("code", {
  presets: ["es2015"]
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    next();
});

app.options('*', function(req, res) {
    res.send(200);
});

server.listen(3000, (err) => {
    if (err) {
        throw err;
    }
    console.log('Node Endpoints working :)');
});

module.exports = server;

var con = sql.createConnection({
    host:'localhost',
	port: 3306,
    user:'root',
    password:'Rats_1324',
    database:'workout_info'
});
con.connect();

app.get('/getGreenhouseData/:date', (req, res) => {

  var date = req.params.date.substring(0,10);
  date = "%"+date+"%";
  console.log(date);

  con.query('SELECT * FROM sensor_data WHERE time LIKE ?', [date], function(err, data) {
    if(err) {
          res.status(200).send({"message":"No data for: "+date+" found"}).end();
        }
        else {
          var sendData = [];
          for(var i = 0; i < data.length; i++) {
              sendData[i] = ({
                "temperature": data[i].temperature,
                "humidity": data[i].humidity
              })
          }
          res.status(200).send(sendData).end();
        }
  });
});

app.get('/getLightTimer', (req, res) => {

  con.query('SELECT * FROM sensor_info_light', function(err, data) {
    if(err) {
          res.status(200).send({"message":"No data found"}).end();
        }
        else {
          res.status(200).send(JSON.stringify(data)).end();
        }
  });
});

app.get('/getWaterTimer', (req, res) => {

  con.query('SELECT * FROM sensor_info_water', function(err, data) {
    if(err) {
          res.status(200).send({"message":"No data found"}).end();
        }
        else {
          res.status(200).send(JSON.stringify(data)).end();
        }
  });
});

app.get('/getGreenhouseSensorInfo/:date', (req, res) => {

    var date = req.params.date.substring(0,10);
    date = "%"+date+"%";
    

    con.query('SELECT * FROM sensor_info WHERE (pump1Time LIKE ? OR pump2Time LIKE ? OR pump3Time LIKE ? OR pump4Time LIKE ? OR lights1Time LIKE ? OR lights2Time LIKE ?)', [date, date, date, date, date, date] , async function(err, data) {
        if(data.length === 0) {
            con.query('SELECT * FROM sensor_info ORDER BY pump1Time DESC LIMIT 1', function(err, data2) {
                console.log(JSON.stringify(data2));
                res.status(200).send(JSON.stringify(data2)).end();
            });
        }
        else {
            res.status(200).send(JSON.stringify(data)).end();
        }
    });
});

app.post('/updateLightTimer', (req, res) => {

    var hours = req.body.lightTimer;
    
  con.query('UPDATE sensor_info_light SET lightTimer = ?', [hours], function(err, data) {
    if(err) {
          res.status(400).send({"message":err}).end();
        }
        else {
          res.status(200).send({"message":"success"}).end();
        }
  });
});

app.post('/updateWaterTimer', (req, res) => {

    var hours = req.body.waterTimer;
    var interval = req.body.duration;
    
  con.query('UPDATE sensor_info_water SET waterTimer = ?, duration = ?', [hours, interval], function(err, data) {
    if(err) {
          res.status(400).send({"message":err}).end();
        }
        else {
          res.status(200).send({"message":"success"}).end();
        }
  });
});

app.post('/updateGreenhouseSensors', (req, res) => {
    var choose = req.body.choose;
    var time = req.body.date;
    var all = [req.body.pump1, req.body.pump2, req.body.pump3, req.body.pump4, req.body.lights1, req.body.lights2];

    var applyTimes = [null, null, null, null, null, null];

    for(var i = 0; i < choose.length; i++) {
        switch(choose[i]) {
         case 'pump1':
             applyTimes[0] = time;
             break;
         case 'pump2':
             applyTimes[1] = time;
             break;
         case 'pump3':
             applyTimes[2] = time;
             break;
         case 'pump4':
             applyTimes[3] = time;
             break;
         case 'lights1':
             applyTimes[4] = time;
             break;
         case 'lights2':
             applyTimes[5] = time;
             break;
         default:
             break;
        }
    }
    
    console.log(choose);
    console.log(time);
    console.log(all);

    con.query(
      'INSERT INTO sensor_info(pump1, pump2, pump3, pump4, lights1, lights2, pump1TIme, pump2Time, pump3Time, pump4Time, lights1Time, lights2Time) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [all[0], all[1], all[2], all[3], all[4], all[5], applyTimes[0], applyTimes[1], applyTimes[2], applyTimes[3], applyTimes[4], applyTimes[5]], function(err) {
    if(err) {
        res.status(400).send({"message": err}).end();
    }
    else {
        res.status(200).send({"message":"success"}).end();
    }
    });
});

app.post('/addSensorData', (req, res) => {
  var date = req.body.date;
  var temperature = req.body.temperature;
  var humidity = req.body.humidity;

  con.query(
      'INSERT INTO sensor_data VALUES(?, ?, ?)', [date, temperature, humidity], function(err) {
    if(err) {
      res.status(400).send({"message": err}).end();
    }
    else {
      res.status(200).send({"message":"success"}).end();
    }
  });
});
