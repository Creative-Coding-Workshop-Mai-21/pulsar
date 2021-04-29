let data = [];

function setup() {
  createCanvas(600, 700);
  data = await d3.csv("pulsar.csv", parseRow);

  // we only need to draw the scene once
  noLoop();
}

function draw() {
  background(200);

}

function parseRow(d) {
  let valueArray = Object.values(d);
  valueArray = valueArray.map((v) => {
    return +v;
  });
  return valueArray;
}
