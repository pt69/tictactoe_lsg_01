// This work is licensed under a Creative Commons Attribution 4.0 International License.
// Copyright 2018 Nicolay Strohschen

var fL = 100;
var t = 0;
var mouse_clicked = false;
var fields = new Array(3);
var cur_player = "x";
var gameOver = false;
var winner = null;
var winCol = null; 
var winRow = null;
var winDia = null;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(51);
  noFill();
  stroke(255);
  strokeWeight(4);
  translate(width/2,height/2);
  
  for (var i = 0; i < 3; i++){
    fields[i] = new Array(3);
    for (var ii = 0; ii < 3; ii++){
      var fx = ((-fL*1.5)+(fL*ii));
      var fy = ((-fL*1.5)+(fL*i));
      fields[i][ii] = new field(fx,fy);
    }
  }
}

function draw() {
  background(51);
  translate(width/2,height/2);
  new_mouseX = mouseX - width/2;
  new_mouseY = mouseY - height/2;
  line(-fL*0.5,fL*1.5,-fL*0.5,-fL*1.5);
  line(fL*0.5,fL*1.5,fL*0.5,-fL*1.5);
  line(-fL*1.5,fL*0.5,fL*1.5,fL*0.5);
  line(-fL*1.5,-fL*0.5,fL*1.5,-fL*0.5);
  for (var i = 0; i < 3; i++){
    for (var ii = 0; ii < 3; ii++){
      fields[i][ii].drawSymbol();
    }
  }
  if (gameOver == false){
    checkWin();
    stroke(255);
  }
  if (gameOver == true){
    winScreen();
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
  strokeWeight(4);
  if (windowWidth < 330 || windowHeight < 330){
    fL = 70;    
    refreshAllCoords();
  }
  if (windowWidth > 330 || windowHeight < 330){
    fL = 100;
    refreshAllCoords();
  }
}

function refreshAllCoords(){
  for (var i = 0; i < 3; i++){
    for (var ii = 0; ii < 3; ii++){
      var nfx = ((-fL*1.5)+(fL*ii));
      var nfy = ((-fL*1.5)+(fL*i));
      fields[i][ii].refreshCoords(nfx,nfy);
    }
  }
}

function resetAllSymbols(){
  for (var i = 0; i < 3; i++){
    for (var ii = 0; ii < 3; ii++){
      fields[i][ii].cur_symbol = null;
    }
  }
}

function mousePressed(){
  if (gameOver == true){
    resetAllSymbols();
    winRow = null;
    winCol = null;
    winDia = null;
    winner = null;
    gameOver = false;
    return null;
  }
  for (var i = 0; i < 3; i++){
    for (var ii = 0; ii < 3; ii++){
      fields[i][ii].checkClick();
    }
  }
  return false;
}

function changeCurPlayer(){
  if (cur_player == "x"){
    cur_player = "o";
  } else {
    cur_player = "x";
  }
}

function field(fx,fy){
  this.x = fx;
  this.y = fy;
  this.center = [this.x+fL/2,this.y+fL/2];
  this.cur_symbol = null;
  this.drawSymbol = function(){
    if (this.cur_symbol == "x"){
      drawX(this.center[0],this.center[1]);
    } else if (this.cur_symbol == "o") {
      ellipse(this.center[0], this.center[1], fL*0.8);
    } 
  }
  
  this.checkClick = function(){
   if (((new_mouseX > this.x && new_mouseX < this.x+fL) && (new_mouseY > this.y && new_mouseY < this.y + fL)) && this.cur_symbol == null){
     this.cur_symbol = cur_player;
     changeCurPlayer();
    }
  }
  
  this.refreshCoords = function(nfx,nfy){
    this.x = nfx;
    this.y = nfy;
    this.center = [this.x+fL/2,this.y+fL/2];
  }
}

function areFieldsLeft(){
  for (var i = 0; i < 3; i++){
    for (var ii = 0; ii < 3; ii++){
      if (fields[i][ii].cur_symbol == null){
        return true;
      }
    }
  }
  return false;
}

function drawX(xx,xy){
  var xLength = sqrt(2*sq(fL*0.25)); 
  var x1_1 = xx - xLength; 
  var y1_1 = xy - xLength;
  var x2_1 = xx + xLength;
  var y2_1 = xy + xLength;
  var x1_2 = xx - xLength;
  var y1_2 = xy + xLength;
  var x2_2 = xx + xLength;
  var y2_2 = xy - xLength;
  line(x1_1,y1_1,x2_1,y2_1);
  line(x1_2,y1_2,x2_2,y2_2);
}

function checkWin(){
  for (var i = 0; i < 3; i++) {
    if (fields[i][0].cur_symbol == "x" && fields[i][1].cur_symbol == "x" && fields[i][2].cur_symbol == "x"){
      winRow = i
      gameOver = true;
      winner = "x";
    } else if (fields[i][0].cur_symbol == "o" && fields[i][1].cur_symbol == "o" && fields[i][2].cur_symbol == "o"){
      winRow = i;
      gameOver = true;
      winner = "o";
    }
    if (fields[0][i].cur_symbol == "x" && fields[1][i].cur_symbol == "x" && fields[2][i].cur_symbol == "x"){
      winCol = i;
      gameOver = true;
      winner = "x";
    } else if (fields[0][i].cur_symbol == "o" && fields[1][i].cur_symbol == "o" && fields[2][i].cur_symbol == "o"){
      winCol = i;
      gameOver = true;
      winner = "o";
    }
  }
  if (fields[0][0].cur_symbol == "x" && fields[1][1].cur_symbol == "x" && fields[2][2].cur_symbol == "x"){
    winDia = 0;
    gameOver = true;
    winner = "x";
  } else if (fields[0][0].cur_symbol == "o" && fields[1][1].cur_symbol == "o" && fields[2][2].cur_symbol == "o"){
    winDia = 0;
    gameOver = true;
    winner = "o";
  }
  if (fields[0][2].cur_symbol == "x" && fields[1][1].cur_symbol == "x" && fields[2][0].cur_symbol == "x"){
    winDia = 1;
    gameOver = true;
    winner = "x";
  } else if (fields[0][2].cur_symbol == "o" && fields[1][1].cur_symbol == "o" && fields[2][0].cur_symbol == "o"){
    winDia = 1;
    gameOver = true;
    winner = "o";
  }
  if (gameOver == false && areFieldsLeft() == false){
    gameOver = true;
  }
}

function winScreen(){
  textAlign(CENTER,CENTER);
  textSize(35);
  fill(255);
  if (winner != null){
    r = noise(t+15) * 255;
    g = noise(t+25) * 255;
    b = noise(t+35) * 255;
    stroke(r,g,b);
    text("Gewinner: " + winner.toUpperCase() + " !",0,-fL*2.5);  
  } else if (winner == null) {
    stroke(102);
    text("Unentschieden!",0,-fL*2.5);
  }
  text("Klicke für ein neues Spiel!",0,fL*2.5);
  noFill();
  if (winRow == null && winCol == null && winDia == null){
    //Do nothing
  } else if (winCol == null && winDia == null){
    line(fields[winRow][0].center[0],fields[winRow][0].center[1],fields[winRow][2].center[0],fields[winRow][2].center[1]);
  } else if (winRow == null && winDia == null){
    line(fields[0][winCol].center[0],fields[0][winCol].center[1],fields[2][winCol].center[0],fields[2][winCol].center[1]);
  } else if (winRow == null && winCol == null){
    line(fields[0][2*winDia].center[0],fields[0][2*winDia].center[1],fields[2][Math.abs(2*(winDia-1))].center[0],fields[2][Math.abs(2*(winDia-1))].center[1]);
  }
  t = t + 0.01;
}