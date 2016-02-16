function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  x = evt.clientX - rect.left;
  y = evt.clientY - rect.top;
  dotx = Math.floor((x / (spacing/n)));
  doty = Math.floor((y / (spacing/n)));
  return { x, y, dotx, doty };
} 

function mouseMove(evt) {
  mousePos = getMousePos(canvas, evt);
}

function mouseClick(evt) {
  mousePos = getMousePos(canvas, evt);
  //reset event
  if (click1.x == mousePos.dotx && click1.y == mousePos.doty) { click1 = new Point (-1, -1); click2 = new Point (-1, -1)}
  
  //first click
  else if (click1.x == -1) {
    click1.x = mousePos.dotx;
    click1.y = mousePos.doty;
  }
  //second click
  else if (click2.x == -1) {
    click2.x = mousePos.dotx;
    click2.y = mousePos.doty;
    var inLine = new Line(new Point(click1.x,click1.y), new Point(click2.x,click2.y));
    if (checkValidCursor()) checkLine(inLine);
    else click2 = new Point (-1, -1);
  }
}