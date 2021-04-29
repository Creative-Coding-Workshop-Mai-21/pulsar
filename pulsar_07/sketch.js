let data = [];

let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();

let minValue = -6.05;
let maxValue = 74.31;

let amt = 0;

async function setup() {
  createCanvas(500, 700);
  data = await d3.csv("pulsar.csv", parseRow);

  xScale.domain([0, 255]).range([0, width]);
}

function draw() {
  background(0);

  amt = map(mouseY, 0, height, -200, 0);
  yScale.domain([minValue, maxValue]).range([0, amt]);

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
