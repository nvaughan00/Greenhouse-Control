const urlBase = 'http://ec2-3-16-166-251.us-east-2.compute.amazonaws.com:3000/';
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let other = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
let currentDateTime = date + other;

async function getSensorInfo() {
    cleanDate();

    let url = urlBase+'getGreenhouseSensorInfo/'+date;

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}

async function getSensorData() {
    cleanDate();

    let url = urlBase+'getGreenhouseData/'+date;

    console.log(url)

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}

async function updateSensorInfo(statuses, choose, date) {

    let url = urlBase+'updateGreenhouseSensors';

    await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                pump1: statuses[0],
                pump2: statuses[1],
                pump3: statuses[2],
                pump4: statuses[3],
                lights1: statuses[4],
                lights2: statuses[5],
                choose: choose,
                date: date
            }
        )
    }).catch(err => console.log(err));
}

async function getDailyLights() {
    let url = urlBase+'getLightTimer';

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}


async function getDailyWater() {
    let url = urlBase+'getWaterTimer';

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}

async function updateDailyLightTimer(hours) {
    let url = urlBase+'updateLightTimer';

    await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                lightTimer: hours
            }
        )
    }).catch(err => console.log(err));
}

async function updateDailyWaterTimer(hours, interval) {
    let url = urlBase+'updateWaterTimer';

    await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                waterTimer: hours,
                duration: interval
            }
        )
    }).catch(err => console.log(err));
}

function cleanDate() {
    let num = Number.parseInt(date.toString()[5]);
    if(num !== 0) {
        date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
        other = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        currentDateTime = date +" "+ other;
    }

    if(parseInt(date.charAt(date.length-1)) < 10 && date.charAt(date.length-2) !== '0') {
        date = date.substring(0, date.length-1) + "0" + date.substring(date.length-1, date.length)
    }
}
