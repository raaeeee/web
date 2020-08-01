const sportText = ["TENNIS", "BASEBALL", "BOLING", "golf", "wRESTLING"];
let pressAB;
let menu;
let bowling;
let tennis;
let baseball;
let boxing;
let golf;
let crash;

let ScreenID = -1;
const dinettes = "livin rooms, bed rooms, dah nets, oh yea! you can find them at the market, we talkin bout flea market";

let homemenu = false;
let breakmenu = false;

let AB = [false, false];

let ballx = 100;
let ballv = [30, 15];
let ballmode = false;
let ballstopped = true;
let pins;
let bowlscore = 0;

let ray = 0;
let racquet;
let served = false;
let passed =false;
let tx = 0;
let ty = 0;
let tvx = 0;
let tvy = 0;
let tscore = 0;

let basex = 1000;
let pM = 0;
let bat;
let basev = 0;
let baseStr = "";
let hit = false;

let ryan;
let female;
let glove;
let prevhitID = 0;
let femaleN = 8;
let ryanN = 8;
let KO = false;
let KOtime = 60;
let KOtext = "";


let gx = 200;
let gy = 500;
let gvx = 0;
let gvy = 0;
let gay = 1;
let landed = false;
let prevX;
let prevY;
let golfclub = [];
let countgolf = 0;
let countgolftext = "";
let golfsince = -1;
let icon;
let breakimg;

let file;

function preload() {
  
  
  file = loadSound('data/sample.mp3');
  
  menu = loadImage("data/menu.png");
  bowling = loadImage("data/bowling.png");
  tennis = loadImage("data/tennis.png");  
  baseball = loadImage("data/baseball.png");
  pins = loadImage("data/pins.png");
  pressAB = loadImage("data/ab.png");
  racquet = loadImage("data/3.png");
  bat = loadImage("data/bat.png");
  boxing = loadImage("data/boxing.png");
  ryan = loadImage("data/ryan.png");
  female = loadImage("data/boxing1.png");
  glove = loadImage("data/glove.png");
  golf = loadImage("data/golf.png");
  golfclub[0] = loadImage("data/cluboff.png");
  golfclub[1] = loadImage("data/clubon.png");
  breakimg = loadImage("data/breakimg.png");
}

function setup() {

  createCanvas(800, 620);
  //surface.setTitle("【ＷＩＩ　ＳＰＯＲＴＳ　ＦＯＲ　ＰＣ　（ＦＲＥＥ　ＤＯＷＮＬＯＡＤ】");
  //icon = loadImage("icon.png");
  //surface.setIcon(icon);
  rectMode(CORNERS);
  ellipseMode(CORNERS);
  file.loop();

}


function draw() {
  if (ScreenID == -1) { 
    image(pressAB, 0, 0);
    if (AB[0] == true && AB[1] == true) {
      ScreenID = 0;
    }
  } else {
    if (ScreenID == 0) {
      image(menu,0,0);
      textSize(17);
      noStroke();
      textAlign(LEFT);
      fill(200);
      text(dinettes, 0, 16);
      stroke(0);
      let j = 400;
      for (let i = 0; i < 5; i++) {
        fill(255, 200);
        rect(j,20+120*i,width-20,120*(i+1), 10); 
        fill(0);
        textSize(36);
        textAlign(CENTER);
        noStroke();
        text(sportText[i], j+190, 120*i+100);
        stroke(0);
      }
    }
    else if (ScreenID == 1) {
      image(tennis, 0, 0);
      fill(50,50,200);
      rect(0, height-150, width, height-100);
      fill(150);
      rect(600, 200, 650, height-150);
      ray = constrain(mouseY, 200, height-150);
      image(racquet, 150, ray-50);
      fill(200, 255, 10);
      if (!served) {
        ellipse(210, ray-30, 230, ray-10);
      } else {
        ellipse(tx-10, ty-10, tx+10, ty+10);
        if (!homemenu) {
          tx += tvx;
          ty += tvy;
        }
        if (tx >= 590) {
          tvx = -abs(tvx);
        } else
        if (tx <= 220 && !passed) {
          if (abs(ray-ty) <= 60) {
            tvx = abs(tvx);
            tx = 220;
            tscore++;
          } else {
            passed = true;
          }
        }
        if (tx <= 0) {
          textSize(36);
          fill(0);
          text(str(tscore) + "pts", width/2, height/2);
        }
        if (tx <= -300) {
          served = false;
          tscore = 0;
          passed = false;
        }
        if (ty <= 210) {
          tvy = abs(tvy);
        } else
        if (ty >= height-160) {
          tvy = -abs(tvy);
        } 
      }
    }
    else if (ScreenID == 2) {
      image(baseball, 0, 0);
      fill(40,140,20);
      rect(0, height-150, width, height-100);
      fill(240, 240, 255);
      if (basex > 0) {
        ellipse(basex-10, height-260, basex+10, height-240);
      }
      basex -= 5;
      if (basex - constrain(mouseX, 150, 250) < 0 && !hit) {
        hit = true;
        basev = constrain(mouseX, 150, 250)-pM;
        if (basev < 0) {
          baseStr = "foul borl";
        } else
        if (basev < 2) {
          baseStr = "strike";
        } else
        if (basev < 12) {
          baseStr = "your out!!";
        } else
        if (basev < 25) {
          baseStr = "single!!!";
        } else
        if (basev < 50) {
          baseStr = "double!!!";
        } else
        if (basev < 75) {
          baseStr = "triple!!!";
        } else
        if (basev < 98) {
          baseStr = "HOME RUM !!";
        } else {
          baseStr = "!!!!OUT OF THE PAKR!!!!!";
        }
      } else
      if (basex < -100) {
        baseStr = "";
        basex = 1000;
        hit = false;
      }
      
      pM = constrain(mouseX, 150, 250);
      image(bat, pM, height-280);
      fill(0);
      textSize(36);
      text(baseStr,width/2, height/2);
      if (hit) {
        text(str(basev) + "mph", width/2, height/2 + 75);
      }
    }
    else if (ScreenID == 3) {
      image(bowling, 0, 0);
      fill(139,69,19);
      rect(0, height-150, width, height-100);
      fill(70, 153, 190);
      ellipse(ballx-25,height-200,ballx+25,height-150);
      image(pins, 650, 370);
      if (ballstopped) {
        strokeWeight(4);
        stroke(255, 0, 0);
        for (let i = 0; i < ballv[1]; i++) {
          
          line(ballx+ballv[0]*i, height-175, ballx+ballv[0]*(i+1)-10, height-175);
          
        }
        strokeWeight(1);
        stroke(0);
      } else {
        ballx += 15;
        if (ballx >= width) {
          textSize(50);
          fill(0);
          text(findScore(bowlscore), width/2, height/2);
        }
        if (ballx >= width+30*15) {
          ballx = 100;
          ballv[0] = 30;
          ballv[1] = 15;
          ballstopped = true;
        }
      }
    }
    else if (ScreenID == 4) {
      image(golf, 0, 0);
      fill(40,140,20);
      
      beginShape();
      vertex(-10, -10);
      vertex(-10, height+10);
      vertex(600, height+10);
      vertex(600, height-20);
      vertex(20, height-20);
      vertex(20, 20);
      vertex(width-20, 20);
      vertex(width-20, height-20);
      vertex(650, height-20);
      vertex(650, height+10);
      vertex(width+10, height+10);
      vertex(width+10, -10);
      endShape(CLOSE);
      image(golfclub[int(AB[1])], mouseX-170, mouseY-235);
      if (AB[1]) {
        if ((mouseX-gx)*(gx-prevX) > 0) {
          if (abs(mouseY-gy) < 21 || abs(prevY-gy) < 21) {
            gvx = mouseX-prevX;
            gvy = mouseY-prevY;
            landed = false;
            if (golfsince <= 0) {
              countgolf++;
              golfsince = 60;
            }
          }
        }
        if ((mouseY-gy)*(gy-prevY) > 0) {
          if (abs(mouseX-gx) < 21 || abs(prevX-gx) < 21) {
            gvx = mouseX-prevX;
            gvy = mouseY-prevY;
            landed = false;
            if (golfsince <= 0) {
              countgolf++;
              golfsince = 60;
            }
          }
        }
      }
      if (landed) {
        gay = 0;
      } else {
        gay = 1;
      }
      
      gvy += gay;
      gy += gvy;
      gx += gvx;
      
      if (gy < 30) {
        gvy *= -0.8;
        gy = 30;
      }
      if (gx < 30) {
        gvx *= -0.8;
        gx = 30;
      } 
      if (gx > width-30) {
        gvx *= -0.8;
        gx = width-30;
      }
      if (gy > 590 ) { 
        if (gx <= 600 || gx >= 650) {
          if (gvy >= 5)
            gvy *= -0.8;
          else {
            gvy = 0;
            gvx = 0;
            landed = true;
          }
          gy = height-30;
        } else {
          
          if (countgolf == 0) {
            countgolftext = "";
          } else
          if (countgolf == 1) {
            countgolftext = "!!!!!!!HOLE IN WON!!!!!!!!!!!";
          } else
          if (countgolf == 2) {
            countgolftext = "ALBATOSS!!";
          } else
          if (countgolf == 3) {
            countgolftext = "EGLE";
          } else
          if (countgolf == 4) {
            countgolftext = "birdie";
          } else
          if (countgolf == 5) {
            countgolftext = "par";
          } else
          if (countgolf == 6) {
            countgolftext = "bogey";
          } else
          if (countgolf == 7) {
            countgolftext = "double bodgy";
          } else
          if (countgolf == 8) {
            countgolftext = "triple bodgy";
          } else {
            countgolftext = str(countgolf-5) + "bodgy";
          }
          gx = 200;
          gy = 500;
          gvx = 0;
          gvy = 0;
          gay = 1;
          landed = false;
          countgolf = 0;
        }
      }
      textSize(36);
      fill(0);
      text(countgolftext, width/2, height/2);
      fill(240);
      ellipse(gx-10, gy-10, gx+10, gy+10);
      golfsince--;
    }
    else if (ScreenID == 5) {
      image(boxing, 0, 0);
      fill(0, 200);
      rect(-10, -10, width+10, height+10);
      fill(124);
      rect(100, height, 700, 520);
      fill(0, 0, 150);
      rect(100, 370, 120, 520);
      fill(150, 0, 0);
      rect(680, 370, 700, 520);
      
      image(ryan, 170, 270);
      image(female, 490, 270);
      image(glove, mouseX-30, mouseY-33);
      let hitID = 0;
      if (mouseY >= 270 && mouseY <= 520) {
        if (mouseX >= 170 && mouseX <= 310) {
          hitID = -1;
        }
        if (mouseX >= 490 && mouseX <= 630) {
          hitID = 1;
        }
      }
      if (!KO) {
        if (hitID == 1 && prevhitID != 1) {
          femaleN -= 1;
        }
        if (hitID == -1 && prevhitID != -1) {
          ryanN -= 1;
        }
      } else {
        KOtime--;
        fill(255);
        textSize(36);
        text(KOtext, width/2, 200);
        if (KOtime <= 0) {
          KOtime = 60;
          KO = false;
        }
      }
      
      prevhitID = hitID;
      fill(100, 100, 255);
      let x = 200;
      let y = 200;
      beginShape(TRIANGLE_FAN);
        vertex(x, y);
        for (let i = 0; i <= ryanN; i++) {
          vertex(x+50*sin(i*PI/4), y+50*cos(i*PI/4));
        }
      endShape();
      fill(255, 100, 100);
      x = 600;
      y = 200;
      beginShape(TRIANGLE_FAN);
        vertex(x, y);
        for (let i = 0; i <= femaleN; i++) {
          vertex(x+50*sin(i*PI/4), y+50*cos(i*PI/4));
        }
      endShape();
      
      if (ryanN <= 0) {
        ryanN = 8;
        let k = floor(random(11));
        if (k >= 1) { 
          KOtext = str(k) + "seconds";
        } else {
          KOtext = "KO!!!";
        }
        KO = true;
      }
      if (femaleN <= 0) {
        femaleN = 8;
        let k = floor(random(11));
        if (k >= 1){ 
          KOtext = str(k) + "seconds";
        } else {
          KOtext = "KO!!!";
        }
        KO = true;
      }
      
    }
    if (homemenu) {
      textSize(50);
      fill(255, 200);
      rect(20, 20, width-20, height-20, 10);
      fill(0);
      text("HOME Manu", width/2, 200);
      fill(255, 200);
      rect(250, 300, 550, 400, 10);
      fill(0);
      text("menu", width/2, 380);
    }
    if (breakmenu) {
      image(breakimg, 0, 0);
    }
  }
  prevX = mouseX;
  prevY = mouseY;
}


function mousePressed() {
  if (!homemenu) {
    if (ScreenID == 0) {
      let j = 400;
      if (mouseX >= j && mouseX <= width-20) {
        for (let i = 0; i < 5; i++) {
          if (mouseY >= 20+120*i && mouseY <= 120*(i+1)) {
            ScreenID = i+1;
          }
        }
      }
      if (mouseX >= 48 && mouseX <= 230 && mouseY >= 440 && mouseY <= 600) {
        cursor(WAIT);
        ScreenID = -2;
        fill(255, 160);
        rect(-10, -10, width+10, height+10);
      } 
    }
    else if (ScreenID == 1) {
      ty = mouseY;
      tx = 220;
      tvx = 6;
      tvy = 3;
      served = true;
    }
  } else {
    if (mouseX >= 250 && mouseX <= 550 && mouseY >= 300 && mouseY <= 400) {
      ScreenID = 0;
      homemenu = false;
    }
  }
}

function keyPressed() {
   if (key == 'a' || key == 'A') {
     AB[0] = true;
   } 
   if (key == 'b' || key == 'B') {
     AB[1] = true;
   }
    if (key == 'h' || key == 'H') {
      homemenu = !homemenu;
    }
    if (key == '+') {
      breakmenu = !breakmenu;
    }
    if (!homemenu) {
      if (ScreenID == 3) {
        if (key == 'a' || key == 'A') {
          ballmode = !ballmode;
        } else 
        if (keyCode == LEFT_ARROW) {
          ballv[int(ballmode)]--;
          ballv[int(ballmode)] = constrain(ballv[int(ballmode)], 3, 50);
        } else
        if (keyCode == RIGHT_ARROW) {
          ballv[int(ballmode)]++;
          ballv[int(ballmode)] = constrain(ballv[int(ballmode)], 3, 50);
        } else
        if (key == 'b' || key == 'B') {
          if (ballstopped) {
            ballstopped = false;
            bowlscore = floor(random(12))+1;
          }
        }
      }
    }
}

function keyReleased() {
  if (key == 'a' || key == 'A') {
     AB[0] = false;
   } 
   if (key == 'b' || key == 'B') {
     AB[1] = false;
   }
}

function findScore(n) {
  if (n <= 10) {
    return str(n) + "pins!";
  } else
  if (n == 11) {
    return "Spare!!";
  } else {
    return "Strike!!!";
  }
}