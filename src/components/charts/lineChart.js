import React from 'react';
import CanvasJSReact from '../../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const lineChart = (item, tempState) => {

    const tConvert = (time) => {
        if (time<12 && time != 0) return time+' AM'
        else if (time == 0) return 12+' AM'
        else if (time>12) return time-12+' PM'
        else if (time == 12) return 12+' PM'
    }

    const dateSplit = (value) => {
        let date = value.split(" ")
        return date;
    }

    const tempSwitch = (temp) => {
        if (tempState == 'c') return Math.floor(temp);
        if (tempState == 'f') return Math.floor((temp * 9/5) + 32);
    }

    const chartData = (value) => {
        let data = value.map(item => (
            { label: tConvert(dateSplit(item.dt_txt)[1].split(":")[0]), y: tempSwitch(item.main.temp-273), indexLabel: "{y}" }
        ))

        return data;
    }

    const options = {
        animationEnabled: true,
        exportEnabled: false,
        backgroundColor: "#ffffff",
        maintainAspectRatio: false,
        title:{
        },
        axisX: {
            includeZero: false,
            gridThickness: 0,
            lineThickness: 0,
            tickThickness: 0
        },
        axisY: {
            includeZero: false,
            labelFontSize: 0,
            gridThickness: 0,
            lineThickness: 0,
            tickThickness: 0
        },
        data: [{
            type: "line", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: chartData(item)
        }]
    }

    return (
        <CanvasJSChart options = {options}/>
    )
}

export default lineChart;