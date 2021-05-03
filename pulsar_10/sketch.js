let data = [];

let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();

let minValue = -6.05;
let maxValue = 74.31;

async function setup() {
  createCanvas(800, 900);
  data = await d3.csv("pulsar.csv", parseRow);

  xScale.domain([0, 255]).range([0, width]);
  yScale.domain([minValue, maxValue]).range([0, 8]);
}

function draw() {
  background(255);

  noStroke();
  fill(0);
  for (let i = 0; i < data.length; i++) {
    let currentData = data[i];
    let yPosition = map(i, 0, data.length, 0, height);
    barChart(currentData, yPosition);
  }
}

function barChart(chartData, yPosition) {
  for (let i = 0; i < chartData.length; i += 2) {
    let x = xScale(i);
    let y = yScale(chartData[i]);

    // scale the bars in function of distance to mouse
    let sc = 1;

    // vertical distance
    let vDist = abs(mouseY - yPosition);
    if (vDist < 10) {
      //horizontal distance
      let hDist = abs(mouseX - x);
      let sc = 1;
      if (hDist < 100) {
        sc = map(hDist, 0, 100, 5, 1);
        y *= sc;
      }
    }
    rect(x, yPosition, 3, -y);
  }
}

function barChartCentered(chartData) {
  rectMode(CENTER);
  for (let i = 0; i < chartData.length; i += 2) {
    let x = xScale(i);
    let y1 = yScale(chartData[i]);
    let y2 = 0;
    let h = y2 - y1;
    rect(x, y1, 3, h);
  }
}

function lineChart(chartData) {
  beginShape();
  for (let i = 0; i < chartData.length; i++) {
    let x = xScale(i);
    let y = yScale(chartData[i]);
    vertex(x, y);
  }
  endShape();
}

function parseRow(d) {
  let valueArray = Object.values(d);
  valueArray = valueArray.map((v) => {
    return +v;
  });
  return valueArray;
}
