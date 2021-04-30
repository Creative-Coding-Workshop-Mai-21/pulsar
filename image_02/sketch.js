var img;

function preload() {
  img = loadImage("pic.png");
}

function setup() {
  createCanvas(670, 970);
  console.log("width", img.width, img.height);
  noLoop();
}

function draw() {
  background(0);

  fill(0);
  stroke(255);
  strokeWeight(1.5);
  for (let j = 0; j < img.height; j++) {
    beginShape();
    for (let i = 0; i < img.width; i++) {
      // get current color
      img.loadPixels();
      var c = color(img.get(i, j));

      let x = map(i, 0, img.width, 0, width);
      let y = map(j, 0, img.height, 0, height);

      greyscale = brightness(c);
      var h = map(greyscale, 0, 255, 50, 0);

      curveVertex(x, y - h);
    }
    endShape();
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
