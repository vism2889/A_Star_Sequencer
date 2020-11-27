// AUTHOR: Morgan Visnesky
// DATE: 11/20/2020
// FILENAME: sketch2.js
//
// **********************         DESCRIPTION         *************************
//
// A* MAXmsp sequencer implemented using P5js and documentation created by
// Pawel Janicki, which describes how to integrate P5js and MAXmsp.
//
//
// CITATIONS:
// - https://www.paweljanicki.jp/projects_maxandp5js_en.html
// - https://thecodingtrain.com/CodingChallenges/051.1-astar.html
// - https://en.wikipedia.org/wiki/A*_search_algorithm
// *****************************************************************************


var rows = 20;
var cols = 20;
var grid = new Array()
var openSet = [];
var closedSet = [];
var start;
var end;
var boxSize = 10;
var space = 10;
var path = [];

function removeFromArray(arr, elem)
{
  for (var i = arr.length-1; i >= 0; i--)
  {
    if (arr[i] == elem)
    {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a,b)
{
  //var d = dist(a.i, a.j, b.i, b.j);
  var d = abs(a.i-b.i)+abs(a.j-b.j);
  return d;
}

function Spot(i,j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.col = 255;
  this.neighbors = [];
  this.previous;
  this.wall = false;

  if (random(1) < 0.4)
  {
    this.wall = true;
  }

  this.show = function(){
    //translate(-windowWidth/4 + space, -windowHeight/4+space);
    fill(this.col);
    if (this.wall){
      noStroke(0);
      fill(0);
    }
    else{
      stroke(255,255,255);
    }


    box(boxSize);

  }
  this.setCol = function(col){
    this.col = col;
  }

  this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;
    if (i < cols-1)
    {
      this.neighbors.push(grid[i+1][j]);
    }

    if (i > 0)
    {
      this.neighbors.push(grid[i-1][j]);
    }

    if ( j < rows-1)
    {
      this.neighbors.push(grid[i][j+1]);
    }

    if (j > 0)
    {
      this.neighbors.push(grid[i][j-1]);
    }

  }
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  console.log('A*');

  for (var i = 0; i < cols; i++){
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j] = new Spot(i,j);
      //grid[i][j].previous = grid[0][0];
    }
  }

  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[19][19];
  start.wall = false;
  end.wall = false;
  end.setCol(color(100,50,100));

  openSet.push(start);
  console.log(openSet)

}

function draw() {
  background(0);
  if (openSet.length > 0){
    var winner = 0;
    for (var i = 0; i < openSet.length; i++)
    {
      if (openSet[i].f < openSet[winner].f)
      {
        winner = i;
      }
    }

    var current = openSet[winner];
    if (current === end)
    {

      console.log('Done');
    }
    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for ( var i = 0; i < neighbors.length; i++)
    {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall)
      {
        var tempG = current.g + 1;
        if (openSet.includes(neighbor))
        {
          if (tempG < neighbor.g)
          {
            neighbor.g = tempG;
          }
        }else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }

    }

  } else {
    console.log('No Solution')
  }
  stroke(255);
  rotateY(frameCount/80);
  translate(0,150,0)
  for (var i = 0; i < cols; i++){
    translate(boxSize*2,-cols*2*boxSize,0);
    rotateX(frameCount/1500);
    for (var j = 0; j < rows; j++){
        translate(0,boxSize*2,0);
        grid[i][j].show();
    }
  }

  for (var i = 0; i < closedSet.length; i++)
  {
    //if (!path.includes[closedSet[i]])
    closedSet[i].setCol(color(255,0,0));
  }

  for (var j = 0;j < openSet.length; j++)
  {
    openSet[j].setCol(color(0,0,255));
  }

  path = [];
  var temp = current;
  path.push(temp);
  console.log(temp.previous);
  if (temp.previous)
  while (temp.previous)
  {

    path.push(temp.previous);
    temp.previous.setCol(color(0,255,0));
    temp = temp.previous;
  }


  for (var i =0; i < path.legnth; i++)
  {
    path[i].setCol(color(0,255,0));
    console.log(path[i]);
  }
  //console.log(path)

}
