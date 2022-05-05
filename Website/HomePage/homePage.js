let plantInfo = [
    { name: 'Tomato', type: 'Vegetable', waterCycle: '8hrs', lightCycle: '12hrs' },
    { name: 'Basil', type: 'Herb', waterCycle: '8hrs', lightCycle: '10hrs' },
    { name: 'Rosemary', type: 'Herb', waterCycle: '12hrs', lightCycle: '12hrs' },
    { name: 'Lettuce', type: 'Vegetable', waterCycle: '6hrs', lightCycle: '8hrs' }
];

async function getData() {
    //Grab latest temp & humidity from backend and display
    let dataHT = await getSensorData();

    if (dataHT.length > 0) {
        document.getElementById("temperature").innerText = dataHT[dataHT.length - 1].temperature;
        document.getElementById("humidity").innerText = dataHT[dataHT.length - 1].humidity;
        localStorage.setItem('temp', dataHT[dataHT.length - 1].temperature);
        localStorage.setItem('humid', dataHT[dataHT.length - 1].humidity);
    }
    else {
        document.getElementById("temperature").innerText = 'NAN';
        document.getElementById("humidity").innerText = 'NAN';
        localStorage.setItem('temp', 'NAN');
        localStorage.setItem('humid', 'NAN');
    }

    //Initialize other data
    displayPlantInfo('Tomato');

    //Setup click handlers for div buttons
    const div1 = document.getElementById("plant1Div");
        div1.addEventListener('click', function() {
            displayPlantInfo('Tomato')
        });

    const div2 = document.getElementById("plant2Div");
        div2.addEventListener('click', function() {
            displayPlantInfo('Basil')
        });

    const div3 = document.getElementById("plant3Div");
        div3.addEventListener('click', function() {
            displayPlantInfo('Rosemary')
        });

    const div4 = document.getElementById("plant4Div");
        div4.addEventListener('click', function() {
            displayPlantInfo('Lettuce')
        });
}

function displayPlantInfo(plantName) {
    let index = plantInfo.findIndex(x => x.name === plantName);

    document.getElementById("plantName").innerText = plantInfo[index].name;
    document.getElementById("plantType").innerText = plantInfo[index].type;
    document.getElementById("waterCycle").innerText = plantInfo[index].waterCycle;
    document.getElementById("lightCycle").innerText = plantInfo[index].lightCycle;
}
