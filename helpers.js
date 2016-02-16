function lineOpen(inLine){
  var status = false;
  var i, j = 0;
  for (i=0; i < squareArr.length; i++ ) {
    for (j=0; j < 4; j++){
      if (lineMatch(inLine, squareArr[i].lines[j])) {
        if (squareArr[i].lines[j].open == true) status = true;
      }
    }
  }
  return status;
}

function closeLine(inLine){
  var i , j = 0;
  for (i=0; i < squareArr.length; i++ ) {
    for (j=0; j < 4; j++){
      if (lineMatch(inLine, squareArr[i].lines[j])) squareArr[i].lines[j].open = false;
    }
  }
}

function lineMatch( in1, in2){
  if (pointMatch(in1.p1,in2.p1) && pointMatch(in1.p2,in2.p2)) return true;
  if (pointMatch(in1.p1,in2.p2) && pointMatch(in1.p2,in2.p1)) return true;
  return false;
}

function pointMatch(p1,p2){
  if (p1.x == p2.x && p1.y == p2.y) return true;
  return false;
}

function checkValidCursor(){
  if (((Math.abs(mousePos.dotx - click1.x) == 1) && !((Math.abs(mousePos.doty - click1.y)) >= 1)) ||
       (!(Math.abs(mousePos.dotx - click1.x) >= 1) && ((Math.abs(mousePos.doty - click1.y)) == 1))) return true;
  else return false;
}

function checkLine(inLine){
  if (lineOpen(inLine)) {
    if (player == 0) player=1; //advance player 
    else player=0;
    closeLine(inLine); // Close the line
    // Check for new squares
    var lineCount, squareCount = 0;
    var newLine = 1;
    while (newLine == 1) {
      var i = 0;
      for (i=0; i < squareArr.length; i++ ) { // go through all squares
        if (squareArr[i].owner == -1) { // don't bother with owned ones
          lineCount = 0;
          var j = 0;
          for (j=0; j < 4; j++) {if (squareArr[i].lines[j].open == false) lineCount++;};
          if (lineCount >= 3){ // see if these are three lines
            for (j=0; j < 4; j++) { closeLine(squareArr[i].lines[j]); } //close the square                
            squareArr[i].owner = player; //assign the owner
            score[player]++;
            squareCount++;
          }                   
        }
      }
      if (squareCount == 0) newLine = 0;
      else if (squareCount > 0) squareCount = 0;
    }
    click1 = new Point (-1, -1); click2 = new Point (-1, -1); //reset clicks
    if ((score[0] + score[1]) == Math.pow(n-1,2)){
      if (score[0] > score[1]) winner = 0;
      else if (score[1] > score[0]) winner = 1;
      else winner = 2;
    }
    else if (ptype[player] == "c") dotsAI();
  }
  else {
    //alert("Invalid selection!");
    click1 = new Point (-1, -1); click2 = new Point (-1, -1);
  }
}

function dotsAI(){
  cTurn = true;
  var tryQueue = new Array();
  var qV = new Array();
  //var tryDepth = ((n-1)*n) - ((score[0] + score[1]) * 4); 
  
  while (tryQueue.length < tryDepth){ 
    //alert(Math.round(Math.random() * squareArr.length ));
    var sq = Math.floor(Math.random() * squareArr.length);
    var ln = Math.floor(Math.random() * 4 );
    if (lineOpen(squareArr[sq].lines[ln])){
      tryQueue.push(squareArr[sq].lines[ln]);
      qV.push(aiValue(squareArr[sq].lines[ln]));
    }
  }
  
  var aL = tryQueue[aiBestMove(qV)];
  click1.x = aL.p1.x;
  click1.y = aL.p1.y;
  click2.x = -1;
  click2.y = -1;
  drawDots();drawLines();
  setTimeout(dg0(aL),500);
}
function dg0(aL){setTimeout(function(){drawDots();drawLines();dg1(aL);},cdelay);}
function dg1(aL){click2.x = aL.p2.x;click2.y = aL.p2.y;setTimeout(dg2(aL),cdelay);}
function dg2(aL){drawDots();drawLines();checkLine(aL);setTimeout(function(){cTurn = false;},cdelay);}



function aiValue(inLine){
  var sqJSON = JSON.stringify(squareArr);
  var sqArr2 = JSON.parse(sqJSON);  
  sqArr2 = aiCloseLine(inLine, sqArr2); // Close the line in test map
  // Check for new squares
  var lineCount, squareCount = 0;
  var sqValue = 0;
  var newLine = 1;
  while (newLine == 1) {
    var i = 0;
    for (i=0; i < sqArr2.length; i++ ) {
      if (sqArr2[i].owner == -1) {
        lineCount = 0;
        var j = 0;
        for (j=0; j < 4; j++) {if (sqArr2[i].lines[j].open == false) lineCount++;};
        if (lineCount >= 3){
          for (j=0; j < 4; j++) { 
            sqArr2 = aiCloseLine(sqArr2[i].lines[j],sqArr2); 
          }                
          sqArr2[i].owner = player;
          squareCount++;
          sqValue++;
        }                   
      }
    }
    if (squareCount == 0) newLine = 0;
    else if (squareCount > 0) squareCount = 0;
  }
  return sqValue;
}

function aiCloseLine(inLine, sqArr2){
  var i , j = 0;
  for (i=0; i < sqArr2.length; i++ ) {
    for (j=0; j < 4; j++){
      if (lineMatch(inLine, sqArr2[i].lines[j])) sqArr2[i].lines[j].open = false;
    }
  }
  return sqArr2;
}

function aiBestMove(qV){
  var index = 0;
  var value = qV[0];
  for (var i = 1; i < qV.length; i++) {
    if (qV[i] < value) {
      value = qV[i];
      index = i;
    }
  }
  return index;
}