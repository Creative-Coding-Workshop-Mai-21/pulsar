let data = [];

let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();
let rScale = d3.scaleLinear();

let minValue = -6.05;
let maxValue = 74.31;

let currentPos = 0;

var img;

function preload() {
  img = loadImage("data/pic.png");
}

async function setup() {
  createCanvas(500, 700);

  xScale.domain([0, 255]).range([0, width]);
  yScale.domain([minValue, maxValue]).range([0, -80]);
  rScale.domain([minValue, maxValue]).range([50, 0]);
}

function draw() {
  background(255);

  var mouseXFactor = map(mouseX, 0, width, 0.05, 1);
  var mouseYFactor = map(mouseY, 0, height, 0.05, 1);

  for (var gridX = 0; gridX < img.width; gridX++) {
    for (var gridY = 0; gridY < img.height; gridY++) {
      // grid position + tile size
      var tileWidth = width / img.width;
      var tileHeight = height / img.height;
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      // get current color
      img.loadPixels();
      var c = color(img.get(gridX, gridY));
      // greyscale conversion
      var greyscale = round(
        red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071
      );

      var w1 = map(greyscale, 0, 255, 15, 0.1);
      stroke(0);
      strokeWeight(w1 * mouseXFactor);
      line(posX, posY, posX + 5, posY + 5);
    }
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
