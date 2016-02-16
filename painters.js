// Paint a dot
var colors = ["#27C97B","#00BCD4"];
var fillColors = ["rgba(36,201,123,0.2)","rgba(0,188,212,0.2)"];

function paintDot(x,y,rad,color){
  context.beginPath();
  context.arc(x,y,rad, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

// Paint the Cursor
function paintCursor(x,y,rad,color,fill){
  context.beginPath();
  context.arc(x,y,rad, 0, 2 * Math.PI, false);
  context.lineWidth = 1.5;
  context.strokeStyle = color;
  context.stroke();   
  
  context.beginPath();
  context.arc(x,y,rad, 0, 2 * Math.PI, false);
  context.fillStyle = fill;
  context.fill();  
  
}

function drawDots(){
  //Background
  context.fillStyle = "#282E3E";
  context.fillRect(0, 0, w, h);
  //All Dots
  var radius = 3.5 - (Math.floor(n/10));
  var i = 0;
  for (i = 0; i < pointArr.length; i++) {
    var point = pointArr[i];
    paintDot((point.x * spacing/n) + padding, (point.y * spacing/n) + padding, radius, "#fff");
  }
  //cursor dots
  var cursor = "rgba(255,0,0,.5)";
  var cursorFill = "rgba(255,0,0,.1)";
  if (cTurn == false){
    if (checkValidCursor() || click1.x == -1){ cursor = colors[player]; cursorFill = fillColors[player];}
    if (mousePos.dotx < n && mousePos.doty < n){ paintCursor((mousePos.dotx * spacing/n) + padding, (mousePos.doty * spacing/n) + padding, 15, cursor, cursorFill); }
  }
  if (click1.x > -1){ paintDot((click1.x * spacing/n) + padding, (click1.y * spacing/n) + padding, 12, colors[player]); }
  if (click2.x > -1){ paintDot((click2.x * spacing/n) + padding, (click2.y * spacing/n) + padding, 12, colors[player]); }
  
}
function drawLines(){
  var i , j = 0;
  for (i=0; i < squareArr.length; i++ ) {
    for (j=0; j < 4; j++){
      if (squareArr[i].lines[j].open == false) {
        context.beginPath();
        context.moveTo((squareArr[i].lines[j].p1.x * spacing/n) + padding,
                        (squareArr[i].lines[j].p1.y * spacing/n) + padding);
        context.lineTo((squareArr[i].lines[j].p2.x * spacing/n) + padding,
                        (squareArr[i].lines[j].p2.y * spacing/n) + padding);
        context.lineWidth = 1;
        context.strokeStyle = 'white';
        context.stroke();
      } 
    }
    if (squareArr[i].owner > -1){
      var color = "#ffffff";
      if (squareArr[i].owner == 0 ) color =  "rgb(39,200,122)";
      else  color = "rgb(0,128,212)";
      context.fillStyle = color;
      context.fillRect(((squareArr[i].points[0].x * spacing)/n) + padding, 
                        ((squareArr[i].points[0].y * spacing)/n) + padding,spacing/n,spacing/n);
    }
  }
}

function paintScore(){
    if (player == 0 ){
      $("#player1").css("border","solid 1px " + colors[0]);
      $("#player2").css("border","solid 1px #232937");
    }
    else {
      $("#player1").css("border","solid 1px #232937");
      $("#player2").css("border","solid 1px " + colors[1]);
    }
    $("#player1").text("Player 1 : " + score[0]);
    $("#player2").text("Player 2 : " + score[1]);
}

function paintWinner(){
  if (winner == 0) {alert("1 wins"); winner = -1;}
  if (winner == 1) {alert("2 wins"); winner = -1;}
  if (winner == 2) {alert("A Tie!"); winner = -1;}
}