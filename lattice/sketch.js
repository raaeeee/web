

let mX = 0;
let mY = 0;
let pmX = 0;
let pmY = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  windowResized();
}

function windowResized() {
  p1 = [];
  p2 = [];
  p3 = [];
  resizeCanvas(windowWidth, windowHeight);
  for (let i = 0; i < width/30; i++) {
    p1[i] = [];
    p2[i] = [];
    p3[i] = [];
    for (let j = 0; j < height/30; j++) {
      p1[i][j] = 0;
      p2[i][j] = 0;
      p3[i][j] = 0;
    }
  }
}

function draw() {
  background(0);
  let xOff = width%30/2.0+15;
  let yOff = height%30/2.0+15;
  
  mX = (mouseX-xOff)/30.0;
  mY = (mouseY-yOff)/30.0;
  
  let dmX = mX - pmX;
  let dmY = mY - pmY;
  
  
  
  if (p1.length > 0 && p2.length>0 && p3.length>0) {
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p1[0].length; j++) {
      let d = dist(mX, mY, i, j);
      let dm = dist(dmX, dmY, 0, 0);

      p1[i][j] += 10*dm/sq(d+1);
      p1[i][j] *= 0.98;

      p2[i][j] += 10*dmX/sq(d+1);
      p3[i][j] += 10*dmY/sq(d+1);
      p2[i][j] *= 0.98;
      p3[i][j] *= 0.98;
    }
  }
  if (mouseIsPressed) {
    
  } else {
    
  }
  for (let i = 0; i < width/30-1; i++) {
    for (let j = 0; j < height/30-1; j++) {
      showSquare(xOff+30*i, yOff+30*j, 30*sigmoid(p1[i][j]), atan2(p3[i][j], p2[i][j]));
    }
  }
  
  }
  pmX = mX;
  pmY = mY;
}


function showSquare(x, y, r, t) {
  push();
  translate(x, y);
  rotate(t-HALF_PI);
  
  fill(255);
  rect(0, 0, r, r);
  pop();
  
  
}

function sigmoid(x) {
  return 2*atan(x*0.1)/PI;
}

