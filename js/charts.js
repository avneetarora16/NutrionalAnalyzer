"use strict"

let data1 = [];
let data2 = [];


/**********creating dropdown for Mcdonald's food items**********
  Author:
  https://www.w3schools.com/jsref/met_select_add.asp
  https://www.w3schools.com/howto/howto_custom_select.asp

  Modified by:
  Avneet Arora
*/
//getting values from csv file  and saving them in a local object

d3.csv("data/Mcdonalds.csv").then(function (sourceData) {
    let firstDropdown = document.getElementById('dropdown-1');
    for (let i = 0; i < sourceData.length; i++) {
        let option1 = document.createElement("option");
        option1.text = sourceData[i].Item;
        option1.value = i;
        firstDropdown.add(option1);
    }

    // creating an array with selected values from the csv for d3 donuts chart
    for (let i = 0; i < sourceData.length; i++) {
        let dataObj = {};
        dataObj['item'] = sourceData[i]['Item'];
        dataObj['Calories'] = sourceData[i]['Calories'];
        dataObj['Category'] = sourceData[i]['Category'];
        dataObj['Carbohydates'] = sourceData[i]['Carbohydrates(g)'];
        dataObj['Proteins'] = sourceData[i]['Protein(g)'];
        dataObj['Fats'] = sourceData[i]['Total Fat(g)'];
        dataObj['Sugar'] = sourceData[i]['Sugars(g)'];
        data1.push(dataObj);
    }
    document.getElementById('chart-1-text').innerHTML = data1[0]['item'] + ' : ' + data1[0]['Calories'];
    donutChart('chart-1', 0, data1);
});

//creating a similar dropdown for Burger King food items
d3.csv("data/Burgerking.csv").then(function (sourceData) {
    let secondDropdown = document.getElementById('dropdown-2');
    for (let i = 0; i < sourceData.length; i++) {
        let option2 = document.createElement("option");
        option2.text = sourceData[i].Item;
        option2.value = i;
        secondDropdown.add(option2);
    }
    for (let i = 0; i < sourceData.length; i++) {
        let dataObj = {};
        dataObj['item'] = sourceData[i]['Item'];
        dataObj['Calories'] = sourceData[i]['Calories'];
        dataObj['Category'] = sourceData[i]['Category'];
        dataObj['Carbohydates'] = sourceData[i]['Carbohydrates(g)'];
        dataObj['Proteins'] = sourceData[i]['Protein(g)'];
        dataObj['Fats'] = sourceData[i]['Total Fat(g)'];
        dataObj['Sugar'] = sourceData[i]['Sugars(g)'];
        data2.push(dataObj);
    }
    document.getElementById('chart-2-text').innerHTML = data2[0]['item'] + ' : ' + data2[0]['Calories'];
    donutChart('chart-2', 0, data2);

});

// dropdown change event for both the dropdowns.
function dropdownChange(event) {
    let elementId = event.target.id;
    let dropdown = document.getElementById(elementId);
    let id = dropdown.options[dropdown.selectedIndex].value;
    let chartId = getChartId(elementId);
    let dataObj = getDataObj(elementId);
    document.getElementById(chartId + '-text').innerHTML = dataObj[id]['item'] + ' : ' + dataObj[id]['Calories'];
    donutChart(chartId, id, dataObj);
}

//creating functions to get chart id. 
function getChartId(elementId) {
    if (elementId == 'dropdown-1') {
        return 'chart-1';
    } else {
        return 'chart-2';
    }
}

//creating functions to get data object. 
function getDataObj(elementId) {
    if (elementId == 'dropdown-1') {
        return data1;
    } else {
        return data2;
    }
}



/**********d3- function creating donut charts**********
  Author:
  https://www.tutorialsteacher.com/d3js/create-pie-chart-using-d3js

  Modified by:
  Avneet Arora
*/

function donutChart(chartId, id, dataObj) {
    let data = Object.assign({}, dataObj[id]);
    delete data['item']; //deleting some values that are not required in the chart
    delete data['Calories'];
    delete data['Category'];
    let node = document.getElementById(chartId);
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }

    // set the dimensions and margins of the graph
    let width = 450,
        height = 450,
        margin = 40;

    // The radius of the donut chart 
    let radius = Math.min(width, height) / 2 - margin;

    let svg = d3.select("#" + chartId)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // set the color scale
    let color = d3.scaleOrdinal()
        .domain(data)
        .range(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

    // Compute the position of each group on the pie:
    let pie = d3.pie().value(function (d) {
        return d.value;
    })
    let data_ready = pie(d3.entries(data));

    let arcGenerator = d3.arc()
        .innerRadius(70)
        .outerRadius(radius);

    // Building the donut chart. Each part of the donut is a path that we build using the arc function.
    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .attr('d', d3.arc()
            .innerRadius(70) // This is the size of the donut hole
            .outerRadius(radius)
        )
        .attr('fill', function (d) {
            return (color(d.data.key))
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    // Adding text to the slices of the donut chart. 
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function (d) {
            return d.data.key + ': ' + d.data.value
        })
        .attr("transform", function (d) {
            return "translate(" + arcGenerator.centroid(d) + ")";
            ``
        })
        .style("text-anchor", "middle")
        .style("font-size", 17)
        .style("color", "white");

}