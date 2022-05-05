async function drawGraphP1() {
    let dataHT = await getSensorData();

    let chartOptions = [
        {x: 60, y: 0, y2: 0},
        {x: 55, y: 0, y2: 0},
        {x: 50, y: 0, y2: 0},
        {x: 45, y: 0, y2: 0},
        {x: 40, y: 0, y2: 0},
        {x: 35, y: 0, y2: 0},
        {x: 30, y: 0, y2: 0},
        {x: 25, y: 0, y2: 0},
        {x: 20, y: 0, y2: 0},
        {x: 15, y: 0, y2: 0},
        {x: 10, y: 0, y2: 0},
        {x: 5, y: 0, y2: 0},
        {x: 0, y: 0, y2: 0}
    ]

    console.log(dataHT)

    for (let i = 0; i < dataHT.length; i++) {
        chartOptions[i].y = dataHT[i].temperature
        chartOptions[i].y2 = dataHT[i].humidity
    }

    console.log(chartOptions)

    await JSC.Chart('chartP1', {
        title_label_text: "Daily Temperatures",
        title_label_style_fontSize: '24px',
        title_position: 'center',
        title_padding: '10px',

        type: 'line',

        yAxis_label_text: 'Temperature',
        yAxis_label_style_fontSize: '24px',

        xAxis_label_text: 'Time (Minutes Ago)',
        xAxis_label_style_fontSize: '24px',

        legend_visible: false,
        axisTick_gridLine_visible: false,

        yAxis: {
            alternateGridFill: 'hidden',
            scale: {
                range: [0, 100],
                interval: 10,
            }
        },
        xAxis: {
            scale: {
                invert: true
            }
        },
        series: [
            {
                pointBackgroundColor: "#8DDC89",
                name: "General Health",
                points: [
                    { x: chartOptions[0].x, y: chartOptions[0].y},
                    { x: chartOptions[1].x, y: chartOptions[1].y},
                    { x: chartOptions[2].x, y: chartOptions[2].y},
                    { x: chartOptions[3].x, y: chartOptions[3].y},
                    { x: chartOptions[4].x, y: chartOptions[4].y},
                    { x: chartOptions[5].x, y: chartOptions[5].y},
                    { x: chartOptions[6].x, y: chartOptions[6].y},
                    { x: chartOptions[7].x, y: chartOptions[7].y},
                    { x: chartOptions[8].x, y: chartOptions[8].y},
                    { x: chartOptions[9].x, y: chartOptions[9].y},
                    { x: chartOptions[10].x, y: chartOptions[10].y},
                    { x: chartOptions[11].x, y: chartOptions[11].y},
                    { x: chartOptions[12].x, y: chartOptions[12].y}
                ]
            }
        ]
    });

    await JSC.Chart('chartP2', {
        title_label_text: "Daily Humidity",
        title_label_style_fontSize: '24px',
        title_position: 'center',
        title_padding: '10px',

        type: 'line',

        yAxis_label_text: 'Humidity %',
        yAxis_label_style_fontSize: '24px',

        xAxis_label_text: 'Time (Minutes Ago)',
        xAxis_label_style_fontSize: '24px',

        legend_visible: false,
        axisTick_gridLine_visible: false,

        yAxis: {
            alternateGridFill: 'hidden',
            scale: {
                range: [0, 100],
                interval: 10,
            }
        },
        xAxis: {
            scale: {
                unit: 'numeric',
                invert: true
            }
        },
        series: [
            {
                pointBackgroundColor: "#8DDC89",
                name: "General Health",
                points: [
                    { x: chartOptions[0].x, y: chartOptions[0].y2},
                    { x: chartOptions[1].x, y: chartOptions[1].y2},
                    { x: chartOptions[2].x, y: chartOptions[2].y2},
                    { x: chartOptions[3].x, y: chartOptions[3].y2},
                    { x: chartOptions[4].x, y: chartOptions[4].y2},
                    { x: chartOptions[5].x, y: chartOptions[5].y2},
                    { x: chartOptions[6].x, y: chartOptions[6].y2},
                    { x: chartOptions[7].x, y: chartOptions[7].y2},
                    { x: chartOptions[8].x, y: chartOptions[8].y2},
                    { x: chartOptions[9].x, y: chartOptions[9].y2},
                    { x: chartOptions[10].x, y: chartOptions[10].y2},
                    { x: chartOptions[11].x, y: chartOptions[11].y2},
                    { x: chartOptions[12].x, y: chartOptions[12].y2}
                ]
            }
        ]
    });
}