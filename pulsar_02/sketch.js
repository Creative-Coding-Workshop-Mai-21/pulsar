let data = [];

let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();

let ready = false;

function setup() {
  createCanvas(500, 700);
  d3.csv("pulsar2.csv", function (d) {
    let values = Object.values(d);
    values = values.map((v) => {
      return +v;
    });

    // return {
    //   values: values,
    // };
    return values;
  }).then(function (csv) {
    // console.log(csv);
    data = csv;
    allarrays = [];
    allarrays = allarrays.concat(...data);
    console.log("allarrays", allarrays);
    let extent = d3.extent(allarrays);
    console.log("extent", extent);
    yScale.domain(extent).range([0, -80]);
    xScale.domain([0, 255]).range([0, width]);
    ready = true;
    redraw();
  });

  noLoop();
}

function draw() {
  if (!ready) {
    background(255, 0, 0);
    return;
  }
  background(200);

  console.log(currentData);

  for (let i = 0; i < data.length; i++) {
    var currentData = data[i];
    push();
    translate(0, i * 20);
    lineChart(currentData);
    pop();
  }
}

function lineChart(chartData) {
  beginShape();
  for (let i = 0; i < chartData.length; i++) {
    let x = xScale(i);
    // console.log("x from", i, "=", x);
    let y = yScale(chartData[i]);
    vertex(x, y);
  }
  endShape();
}
