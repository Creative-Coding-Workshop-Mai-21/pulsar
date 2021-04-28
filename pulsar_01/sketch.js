let data = [];

let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();

let ready = false;

function setup() {
  createCanvas(720, 400);
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
    yScale.domain(extent).range([100, 0]);
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

  var currentData = data[0];
  console.log(currentData);

  beginShape();
  for (let i = 0; i < currentData.length; i++) {
    let x = xScale(i);
    // console.log("x from", i, "=", x);
    let y = yScale(currentData[i]);
    vertex(x, y);
  }
  endShape();
}
