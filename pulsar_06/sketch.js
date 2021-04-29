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

  let c = color(255, 204, 0);
  // we only need to draw the scene once
  noLoop();
}

function draw() {
  background(0);

  let startColor = color("#d9ed92"); // color(255, 0, 0);
  let endColor = color("#184e77");

  stroke(255);
  strokeWeight(1.5);
  fill(0);
  for (let i = 0; i < data.length; i++) {
    var currentData = data[i];
    push();
    translate(0, 100 + i * 6);
    let col = lerpColor(startColor, endColor, map(i, 0, data.length, 0, 1));
    fill(col);
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
