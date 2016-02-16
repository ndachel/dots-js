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

function checkLine(inLine){
  if (lineOpen(inLine)) {
    if (player == 0) player=1 //advance player 
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
  }
  else {
    //alert("Invalid selection!");
    click1 = new Point (-1, -1); click2 = new Point (-1, -1);
  }
}

function checkValidCursor(){
  if (((Math.abs(mousePos.dotx - click1.x) == 1) && !((Math.abs(mousePos.doty - click1.y)) >= 1)) ||
       (!(Math.abs(mousePos.dotx - click1.x) >= 1) && ((Math.abs(mousePos.doty - click1.y)) == 1))) return true;
  else return false;
}