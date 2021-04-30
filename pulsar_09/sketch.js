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
  background(255);

  for (let j = 0; j < img.height; j++) {
    for (let i = 0; i < img.width; i++) {
      let x = map(i, 0, img.width, 0, width);
      let y = map(j, 0, img.height, 0, height);

      // get current color
      img.loadPixels();
      var c = color(img.get(i, j));

      // greyscale conversion
      var greyscale = round(
        red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071
      );

      var r = map(greyscale, 0, 255, 15, 0);
      noStroke();
      fill(0);

      ellipse(x, y, r, r);
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
