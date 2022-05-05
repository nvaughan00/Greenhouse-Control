let statusesRaw = [0,0,0,0,0,0];
const updateAll = ['pump1', 'pump2', 'pump3', 'pump4', 'lights1', 'lights2'];
let lights1Hours = 0;
let waterHours = 0;
let waterInterval = 0;

async function startControls() {
    let controlData = await getSensorInfo();
    let lightTimer = await getDailyLights();
    let waterTimer = await getDailyWater();

    lights1Hours = lightTimer[0].lightTimer;
    waterHours = waterTimer[0].waterTimer;
    waterInterval = waterTimer[0].duration;

    mapValuesToArray(controlData[controlData.length - 1]);

    document.getElementById("tempHeaderControl").innerText = "Temperature: "+localStorage.getItem('temp');
    document.getElementById("humidHeaderControl").innerText = "Humidity: "+localStorage.getItem('humid');
    document.getElementById("dailyWaterControl").innerText = "Water Schedule: "+waterInterval*10 +"ml Every "+ waterHours+" Hrs";
    document.getElementById("dailyLightControl").innerText = "Light Schedule: "+lights1Hours +" Hrs/Day";
    document.getElementById("light1HoursDaily").innerText = "Hours per day: "+lights1Hours;
    document.getElementById("waterTimerInterval").innerText = "Supply every "+waterHours+" hours";
    document.getElementById("waterSecondsInterval").innerText = "Amount of water supplied: "+waterInterval*10+"ml";

    if(statusesRaw[0] === 1) {
        document.getElementById("nozzle1Toggle").click();
    }

    if(statusesRaw[4] === 1) {
        document.getElementById("lights1Toggle").click();
    }

    await updateButtonsAndHandlers();
}

async function updateLights1() {
    if(statusesRaw[4] === 1) {
        statusesRaw[4] = 0;
    }
    else if (statusesRaw[4] === 0) {
        statusesRaw[4] = 1;
    }
    let date = calcDate();
    await updateSensorInfo(statusesRaw, updateAll, date);
    updateStatuses();
}

async function updatePump1() {
    if(statusesRaw[0] === 1) {
        statusesRaw[0] = 0;
    }
    else if (statusesRaw[0] === 0) {
        statusesRaw[0] = 1;
    }
    let date = calcDate();
    await updateSensorInfo(statusesRaw, updateAll, date);
    updateStatuses();
}

function updateStatuses() {
    document.getElementById("pump1HeaderControl").innerText = "Nozzles Status: "+toDisplayValue(statusesRaw[0]);
    document.getElementById("light1HeaderControl").innerText = "Lights Status: "+toDisplayValue(statusesRaw[4]);
}

function toDisplayValue(val) {
    if(val === 1) {
        return "On";
    }
    return "Off";
}

function mapValuesToArray(httpItem) {
    statusesRaw[0] = httpItem.pump1;
    statusesRaw[1] = httpItem.pump2;
    statusesRaw[2] = httpItem.pump3;
    statusesRaw[3] = httpItem.pump4;
    statusesRaw[4] = httpItem.lights1;
    statusesRaw[5] = httpItem.lights2;
}

async function updateButtonsAndHandlers() {
    updateStatuses();

    let lights1Event = document.getElementById("lights1Toggle");
        lights1Event.addEventListener('click', async function() {
                await updateLights1()
            }
        );

    let pump1Event = document.getElementById("nozzle1Toggle");
        pump1Event.addEventListener('click', async function() {
                await updatePump1()
            }
        );
}

function calcDate() {
    let currentDate = new Date();
    return (
        currentDate.getFullYear() + "-"
        + (currentDate.getMonth()+1)  + "-"
        + currentDate.getDate() + " "
        + currentDate.getHours() + ":"
        + currentDate.getMinutes() + ":"
        + currentDate.getSeconds()
    );
}

function decreaseDailyHours() {
    if (lights1Hours > 0) {
        lights1Hours--;
        document.getElementById("light1HoursDaily").innerText = "Hours per day: "+lights1Hours;
    }
}

function increaseDailyHours() {
    if (lights1Hours < 24) {
        lights1Hours++;
        document.getElementById("light1HoursDaily").innerText = "Hours per day: "+lights1Hours;
    }
}

async function submitDailyLightHours() {
    await updateDailyLightTimer(lights1Hours);
    document.getElementById("successSubmitLight").innerText = 'Success!';
    document.getElementById("dailyLightControl").innerText = "Light Schedule: "+lights1Hours +" Hrs/Day";
    setInterval(function() { document.getElementById("successSubmitLight").innerText = ''; }, 2000)
}

function decreaseDailyHoursWater() {
    if (waterHours > 0) {
        waterHours--;
        document.getElementById("waterTimerInterval").innerText = "Supply every "+waterHours+" hours";
    }
}

function increaseDailyHoursWater() {
    if (waterHours < 24) {
        waterHours++;
        document.getElementById("waterTimerInterval").innerText = "Supply every "+waterHours+" hours";
    }
}

function decreaseWaterSeconds() {
    if (waterInterval > 0) {
        waterInterval--;
        document.getElementById("waterSecondsInterval").innerText = "Amount of water supplied: "+waterInterval*10+"ml";
    }
}

function increaseWaterSeconds() {
    if (waterInterval < 40) {
        waterInterval++;
        document.getElementById("waterSecondsInterval").innerText = "Amount of water supplied: "+waterInterval*10+"ml";
    }
}

async function submitWaterStuff() {
    await updateDailyWaterTimer(waterHours, waterInterval);
    document.getElementById("successSubmitWater").innerText = 'Success!';
    document.getElementById("dailyWaterControl").innerText = "Water Schedule: "+waterInterval*10 +"ml Every "+ waterHours+" Hrs";
    setInterval(function() { document.getElementById("successSubmitWater").innerText = ''; }, 2000)
}
