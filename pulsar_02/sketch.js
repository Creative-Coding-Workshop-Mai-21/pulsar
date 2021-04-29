let data = [];

let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();

let minValue = -6.05;
let maxValue = 74.31;

async function setup() {
  createCanvas(500, 700);
  data = await d3.csv("pulsar.csv", parseRow);

  xScale.domain([0, 255]).range([0, width]);
  yScale.domain([minValue, maxValue]).range([0, -80]);

  // we only need to draw the scene once
  noLoop();
}

function draw() {
  background(0);

  stroke(255);
  strokeWeight(1.5);
  fill(0);
  for (let i = 0; i < data.length; i++) {
    var currentData = data[i];
    push();
    translate(0, 100 + i * 6);
    lineChart(currentData);
    pop();
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
