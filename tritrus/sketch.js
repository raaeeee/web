const L = [
  [0, 0],
  [0, 1],
  [0, 2]
];
const M = [
  [-1, 0],
  [0, 0],
  [1, 0]
];
const B = [
  [0, 0],
  [0, 1],
  [1, 0]
];
const D = [
  [-1, 0],
  [0, 0],
  [0, 1]
];
const P = [
  [0, 0],
  [0, 1],
  [1, 1]
];
const Q = [
  [-1, 1],
  [0, 0],
  [0, 1]
];
const I = [
  [0, 0],
  [0, 1]
];
const O = [
  [0, 0]
];
var board = [];
const keys = [
  [81, 87, 69, 82, 85, 73, 79, 80],
  [87, 69, 82, 84, 89, 85, 73, 79]
];
var preset = 0;

const pieces = [L, M, B, D, P, Q, I, O];
var piece;
var nextpiece;
var maxlevel = 0;

var menuID = 0;
const menu = ["START", "CONTROLS", "HIGHSCORES", "QUIT"];

var ID = 0;
var level = 0;
var slevel = level;
var rowcount = 0;

var score = 0;
var x = 4;

var time = 0;


var released = true;

var font;
var tiles;
let images = [];
var highscores = [];
let highlevel = 0;


function preload() {
  for (let i = 0; i < 10; i++) {
    highscores[i] = [];
    for (let j = 0; j < 3; j++) {
      highscores[i][j] = getItem(str(10 * i + j));
      if (highscores[i][j] === null) {
        highscores[i][j] = 0;
      }
    }
  }
  maxlevel = getItem('levelstore')
  if (highlevel === null) {
    maxlevel = 0;
  }
  tiles = loadImage("assets/tilefile5.png");
  font = loadFont("assets/ARCADECLASSIC.TTF");

}

function setup() {

  textFont(font);
  piece = floor(random(pieces.length));
  nextpiece = floor(random(pieces.length));

  for (let i = 0; i < 5; i++) {
    images[i] = []
    for (let j = 0; j < 7; j++) {
      images[i][j] = tiles.get(i * 40, j * 40, 40, 40);
    }
  }
  createCanvas(560, 920);
  background(0);
  noStroke();

  frameRate(60);

  for (let i = 0; i < 20; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i][j] = -1;
    }
  }

  textAlign(CENTER);

  level = floor(maxlevel / 2);
  time = dropTime(level);
}

function draw() {
  if (ID == 0) {
    background(0);
    textSize(44);
    fill(255);
    showMenu(menuID);

  } else if (ID == 1) {
    var a = time / dropTime(level);
    displayTime(a);
    if (level > 0) {
      time--;
      if (time < 0 && x > -1) {
        drop();
        updateGraphics();
      }
    }
  } else if (ID == 2) {
    fill(200);
    rect(40, 40, 320, 800);
    fill(0);
    textSize(48);
    text("HIGHSCORES", 200, 100);
    var a = ["SCORE", "LEVEL", "LINES"];
    for (let i = 0; i < 3; i++) {
      textSize(24);
      text(a[i], 120 + 135 * i - 16 * sq(i), 155);
      textSize(32);
      for (let j = 0; j < highscores.length; j++) {
        text(nf(highscores[highscores.length - 1 - j][i], 8 * int(i == 0)), 120 + 135 * i - 16 * sq(i), 190 + 50 * j);
      }
    }
    textSize(32);
    text("SPACE TO CONTINUE", 200, 820);
  } else if (ID == 3) {
    background(0);
    textSize(64);
    fill(150);
    text("PAUSED", width / 2, height / 2);

  } else if (ID == 4) {
    background(0);
    textSize(64);
    text("CONTROLS", width / 2, 60);
    textSize(48);
    fill(150);
    text("SPACE TO DROP", width / 2, 150);
    text("ENTER TO PAUSE", width / 2, 230);
    text("COLUMN KEYS", width / 2, 400);
    textSize(64);
    fill(150);
    for (let j = 0; j < keys.length; j++) {
      for (let i = 0; i < keys[0].length; i++) {
        fill(150 + 105 * int(j == preset));
        text(str(char(keys[j][i])), 70 + 60 * i, 490 + 100 * j);
      }
    }
    textSize(48);
    fill(255);
    text("SPACE TO SELECT", width / 2, 900);
  } else if (ID == 5) {
    background(0);
    fill(255);
    textSize(64);
    text("HIGHSCORES", width / 2, 60);
    var a = ["SCORE", "LEVEL", "LINES"];
    for (let i = 0; i < 3; i++) {
      textSize(32);
      fill(255);
      text(a[i], 125 + 220 * i - 20 * sq(i), 120);
      textSize(48);
      fill(150);
      for (let j = 0; j < highscores.length; j++) {
        text(nf(highscores[highscores.length - 1 - j][i], 8 * int(i == 0)), 125 + 220 * i - 20 * sq(i), 180 + 70 * j);
      }
    }
    textSize(48);
    fill(255);
    text("SPACE TO CONTINUE", width / 2, 900);
  } else if (ID == 6) {
    background(0);
    fill(255);
    textSize(48);
    text("STARTING  LEVEL", width / 2, 400)
    textSize(64);
    text(level, width / 2, 550);

    if (level + 1 > floor(maxlevel / 2)) {
      fill(150);
    } else {
      fill(255);
    }
    triangle(width / 2 - 10, 490, width / 2 + 10, 490, width / 2, 482);
    if (level - 1 < 0) {
      fill(150);
    } else {
      fill(255);
    }
    triangle(width / 2 - 10, 570, width / 2 + 10, 570, width / 2, 578);
  }
}

function updateGraphics() {
  fill(200);
  rect(40, 40, 320, 800);
  fill(0);
  rect(40, 840, 320, 60);
  fill(80);
  textSize(48);
  for (let i = 0; i < keys[0].length; i++) {
    fill(int(x == i) * 70 + 150);
    text(str(char(keys[preset][i])), 60 + 40 * i, 880);
  }

  var b = min((floor(level / 10) + 1), 6);
  if (level == 0) b = 0;


  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      var a = board[i][j];
      if (a >= 0) {
        //image(images[0][0], x, y);
        image(images[4 - a % 4 - floor(a / 7)][b], 40 + j * 40, 800 - i * 40);
      }
    }
  }
  var y = findLowestY(piece, x);
  showLowestY(piece, x, y);
  writeText();
}

function keyPressed() {
  if (ID == 0) {
    if (key == ' ') {
      if (menuID == 0) {
        ID = 6;
      } else
      if (menuID == 1) {
        ID = 4;
      } else
      if (menuID == 2) {
        ID = 5;
      }
    } else
    if (keyCode == DOWN_ARROW) {
      menuID++;
      menuID %= 3;
    } else
    if (keyCode == UP_ARROW) {
      menuID += 3;
      menuID %= 2;
    }
  } else if (ID == 1) {
    if (released) {
      if (key == ' ' && x > -1) {
        drop();
      }
      if (key == char(keys[preset][0]) || key == char(keys[preset][0] + 32)) {
        if (piece == 1 || piece == 3 || piece == 5) {
          x = 1;
        } else {
          x = 0;
        }
      } else if (key == char(keys[preset][1]) || key == char(keys[preset][1] + 32)) {
        x = 1;
      } else if (key == char(keys[preset][2]) || key == char(keys[preset][2] + 32)) {
        x = 2;
      } else if (key == char(keys[preset][3]) || key == char(keys[preset][3] + 32)) {
        x = 3;
      } else if (key == char(keys[preset][4]) || key == char(keys[preset][4] + 32)) {
        x = 4;
      } else if (key == char(keys[preset][5]) || key == char(keys[preset][5] + 32)) {
        x = 5;
      } else if (key == char(keys[preset][6]) || key == char(keys[preset][6] + 32)) {
        x = 6;
      } else if (key == char(keys[preset][7]) || key == char(keys[preset][7] + 32)) {
        if (piece == 0 || piece == 3 || piece == 5 || piece == 6 || piece == 7) {
          x = 7;
        } else {
          x = 6;
        }
      }
      updateGraphics();
    }
    //if (key == 't' || key == 'T' || key == 'y' || key == 'Y') {
    if (keyCode == RETURN || keyCode == ENTER) {
      ID = 3;
    }
  } else if (ID == 2) {
    if (key == ' ') {
      ID = 0;
      board = [];
      for (let i = 0; i < 20; i++) {
        board[i] = [];
        for (let j = 0; j < 8; j++) {
          board[i][j] = -1;
        }
      }
      piece = floor(random(pieces.length));
      nextpiece = floor(random(pieces.length));

      rowcount = 0;

      level = floor(maxlevel / 2);
      score = 0;
      x = 4;

      time = dropTime(level);


      released = true;

    }
  } else if (ID == 3) {
    if (keyCode == RETURN || keyCode == ENTER) {
      ID = 1;
      background(0);
      updateGraphics();
      updateNext(nextpiece);
    }
  } else if (ID == 4) {
    if (key == ' ') {
      ID = 0;
    }
    if (keyCode == DOWN_ARROW) {
      preset++;
      preset %= keys.length;
    }
    if (keyCode == UP_ARROW) {
      preset += (keys.length - 1);
      preset %= keys.length;
    }
  } else if (ID == 5) {
    if (key == ' ') {
      ID = 0;
    }
  } else if (ID == 6) {
    if (key == ' ') {
      ID = 1;
      background(0);
      noStroke();
      fill(200);
      rect(40, 40, 320, 800);
      rect(400, 40, 120, 240);
      rect(400, 340, 120, 120);
      slevel = level;
      var y = findLowestY(piece, x);
      showLowestY(piece, x, y);
      updateNext(nextpiece);
      writeText();
      fill(0);
      rect(40, 840, 320, 60);
      fill(80);
      textSize(48);
      time = dropTime(level);
      for (let i = 0; i < keys[0].length; i++) {
        fill(int(x == i) * 70 + 150);
        text(str(char(keys[preset][i])), 60 + 40 * i, 880);
      }
    }
    if (keyCode == DOWN_ARROW) {
      level -= 1
      level = max(0, level);
    }
    if (keyCode == UP_ARROW) {
      level += 1
      level = min(level, floor(maxlevel / 2));
    }
  }
  released = false;
}

function keyReleased() {
  released = true;
}

function dropTime(level) {
  if (level >= 50) return 70 - level;
  else if (level >= 40) return floor(43.3333 - 0.3333 * level);
  else if (level >= 30) return floor(55 - 0.5 * level);
  else if (level >= 20) return 80 - level;
  else if (level >= 10) return 140 - 2 * level;
  else if (level > 0) return 240 - 6 * level;
  else return -1;
}


function findLowestY(piece, x) {
  var y = 0;
  if (x == -1) {
    return -1;
  }
  while (y < 20) {
    var correct = true;
    for (let i = 0; i < pieces[piece].length; i++) {
      c = pieces[piece][i];
      if (c[1] + y < 20) {
        if (board[c[1] + y][c[0] + x] != -1) {
          correct = false;
        }
      } else {
        return -1;
      }
    }
    if (correct) {
      return y;
    }
    y++;
  }
  return -1;
}

function showLowestY(piece, x, y) {
  if (x > -1 && y > -1) {
    for (let i = 0; i < pieces[piece].length; i++) {
      c = pieces[piece][i];
      fill(80);
      rect(40 + (x + c[0]) * 40, 800 + (-y - c[1]) * 40, 40, 40);
    }
  }
}


function dropPiece(piece, x) {
  var y = findLowestY(piece, x);
  for (let i = 0; i < pieces[piece].length; i++) {
    c = pieces[piece][i];
    board[c[1] + y][c[0] + x] = piece;
    score += 10 * (level + 10);
  }
  var clearCount = 0;
  for (let row = board.length - 1; row >= 0; row--) {
    if (fullRow(board[row])) {
      popRow(row);
      rowcount += 1;
      clearCount += 1;
    }
  }
  if (clearCount == 1) {
    score += 1000 * (level + 1);
  } else if (clearCount == 2) {
    score += 4000 * (level + 1);
  } else if (clearCount == 3) {
    score += 10000 * (level + 1);
  }
  level = max(floor(rowcount / 5), slevel);
}


function fullRow(row) {
  for (let i = 0; i < row.length; i++) {
    cell = row[i];
    if (cell == -1) {
      return false;
    }
  }
  return true;
}

function popRow(row) {
  for (let r = row; r < board.length - 1; r++) {
    board[r] = board[r + 1];
  }
  var temp = [-1, -1, -1, -1, -1, -1, -1, -1];
  board[board.length - 1] = temp;
}

function updateNext(piece) {
  fill(200);
  rect(400, 340, 120, 120);
  for (let i = 0; i < pieces[piece].length; i++) {
    c = pieces[piece][i];
    if (piece == 1 || piece == 2 || piece == 3 || piece == 7) {
      adjustFill(piece, level, 440 + 40 * c[0], 380 - 40 * c[1]);
    } else {
      adjustFill(piece, level, 440 + 40 * c[0], 420 - 40 * c[1]);
    }
  }
}

function adjustFill(a, level, x, y) {
  var b = min((floor(level / 10) + 1), 6);
  if (level == 0) b = 0;
  if (a >= 0) {
    image(images[4 - a % 4 - floor(a / 7)][b], x, y);
  }
}

function displayTime(p) {
  p = constrain(p, 0, 1);
  fill(0);
  rect(400, 40, 120, 240);
  fill(200);
  for (let i = 272; i >= floor((1 - p) * 240 / 8) * 8 + 40; i -= 8) {
    fill(min(110 + i / 2 + 5 * i % 16, 255));
    rect(400, i, 120, 8);
  }
}

function drop() {
  var LY = findLowestY(piece, x);
  if (LY <= -1) {
    print(level);
    print(nf(score, 8));
    print(rowcount);
    gameover();
  } else {
    dropPiece(piece, x);
  }
  piece = nextpiece;
  nextpiece = floor(random(pieces.length));
  updateNext(nextpiece);
  if (x == 0) {
    if (piece == 1 || piece == 3 || piece == 5) {
      x = 1;
    }
  }
  if (x == 7) {
    if (piece == 1 || piece == 2 || piece == 4) {
      x = 6;
    }
  }
  time = dropTime(level);
}

function writeText() {
  fill(0);
  rect(360, 520, 190, 500);
  rect(360, 280, 190, 40);
  rect(360, 462, 190, 40);
  fill(255);
  textSize(24);
  text("DROP", 460, 300);
  text("NEXT", 460, 482);
  textSize(64);
  text("LEVEL", 460, 760);
  text("LINES", 460, 660);
  text("SCORE", 460, 560);
  textSize(44);
  text(level, 460, 800);
  text(rowcount, 460, 700);
  text(nf(score, 8), 460, 600);
}

function showMenu(ID) {
  fill(255);
  textSize(92);
  text("TRITRUS", width / 2, 200);
  fill(150);
  textSize(48);
  for (let i = 0; i < 3; i++) {
    if (i == ID) {
      fill(255);
    } else {
      fill(150);
    }
    text(menu[i], width / 2, 300 + 100 * i);
  }

}

function gameover() {
  var scoreRow = [score, level, rowcount];
  if (score > highscores[0][0]) {
    highscores[0] = scoreRow;
  }
  for (let i = 1; i < highscores.length; i++) {
    if (score > highscores[i][0]) {
      highscores[i - 1] = highscores[i];
      highscores[i] = scoreRow;
    }
  }

  storeItem('levelstore', maxlevel);
  for (let i = 0; i < highscores.length; i++) {
    for (let j = 0; j < 3; j++) {
      storeItem(str(i * 10 + j), highscores[i][j]);
    }
  }

  ID = 2;
}