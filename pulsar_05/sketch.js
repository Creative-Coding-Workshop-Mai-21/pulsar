let data = [];

let xScale = d3.scaleLinear();
let hScale = d3.scaleLinear();
let colScale = d3.scaleLinear();

let minValue = -6.05;
let maxValue = 74.31;

async function setup() {
  createCanvas(800, 700);
  data = await d3.csv("pulsar.csv", parseRow);

  xScale.domain([0, 255]).range([0, width]);
  hScale.domain([minValue, maxValue]).range([0, 80]);
  colScale.domain([minValue, maxValue]).range([255, 0]);

  // we only need to draw the scene once
  noLoop();
}

function draw() {
  background(255);

  for (let i = 0; i < data.length; i++) {
    var currentData = data[i];
    push();
    translate(0, 50 + i * 50);
    barChartCentered2(currentData);
    pop();
  }
}

function barChartCentered2(chartData) {
  rectMode(CENTER);
  for (let i = 0; i < chartData.length; i += 1) {
    let x = xScale(i);
    let h = hScale(chartData[i]);
    let c = colScale(chartData[i]);

    fill(255);
    stroke(0);

    ellipse(x, 0, h, h);
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
