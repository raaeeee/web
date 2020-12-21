var balls = [];
var acc = 0.2;
var h = 0.0;
var mV = 0.0;
var mX = -1.0;
var mY = -1.0;
var mouseP = false;
var rtot = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  ellipseMode(RADIUS);
  noStroke();
}

function draw() {
  if (mX < 0 || mY < 0) {
    mV = 0;
  } else {
    mV = sqrt(sq(mX - mouseX) + sq(mY - mouseY));
    mV = min(mV, 30);
  }



  background(rtot / 20.0 - 40);
  if (mouseP == true) {
    var t = randomGaussian() / 3 + PI / 2;
    var v = random(3, 9);
    var r = random(5, 10) + mV / 1.5;
    if (random(1) < 1) {
      rtot += r;
      balls.push(new Ball(t, h, v, r));
    }
    mX = mouseX;
    mY = mouseY;

  }
  h++;
  h %= 360;
  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }

  i = balls.length - 1;
  while (i >= 0) {
    if (balls[i].brightnes < 0) {
      rtot -= balls[i].r;
      balls.splice(i, 1);
    }
    i--;
  }
  // if (frameCount%5 == 0) {
  //   saveCanvas('drop', 'png');
  // }

}

function mouseReleased() {
  mX = -1;
  mY = -1;
  mouseP = false;
}

function mousePressed() {
  mouseP = true;
}


function Ball(t, h, v, rad) {
  this.brightnes = 100;
  this.hu = h;
  this.yvel = -v * sin(t);
  this.xvel = v * cos(t);
  this.xpos = mouseX;
  this.ypos = mouseY;
  this.r = rad;

  this.update = function() {
    this.xpos += this.xvel;
    this.yvel += acc;
    this.ypos += this.yvel;
    this.hu += 4;
    this.hu %= 360;
    this.brightnes--;
  }


  this.display = function() {
    fill(this.hu, 100, 100, this.brightnes);
    ellipse(this.xpos, this.ypos, this.r, this.r);
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}