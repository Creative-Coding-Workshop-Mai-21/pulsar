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

  image(img, 0, 0);
}
