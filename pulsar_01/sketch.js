let data = [];

let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();

let minValue = -6.05;
let maxValue = 74.31;

async function setup() {
  createCanvas(600, 700);
  data = await d3.csv("pulsar.csv", parseRow);

  xScale.domain([0, 255]).range([0, width]);
  yScale.domain([minValue, maxValue]).range([100, 0]);

  // we only need to draw the scene once
  noLoop();
}

function draw() {
  background(200);

  // get the first array
  var currentData = data[4];

  // draw the line
  beginShape();
  for (let i = 0; i < currentData.length; i++) {
    let x = xScale(i);
    let y = yScale(currentData[i]);
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
