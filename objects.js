function Point (x,y)
{
  this.x = x;
  this.y = y;
}

function Square (){
  this.points = new Array();
  this.lines = new Array();
  this.owner = -1;
}

function Line (p1, p2, open){
  this.p1 = p1;
  this.p2 = p2;
  this.open = open;
}