// AUTHOR: Morgan Visnesky
// DATE: 11/20/2020
// FILENAME: sketch2.js
//
// **********************         DESCRIPTION         *************************
//
// A* path planning algorithm purposed as a sequencer to control maxMSP.
// The project was implemented using P5js and documentation created by
// Pawel Janicki, which describes how to integrate P5js and MAXmsp.
//
// The A* portion of this script was refactored from Daniel Shiffmans 2D
// implementation which also uses p5.js.
//
// CITATIONS:
// - https://www.paweljanicki.jp/projects_maxandp5js_en.html
// - https://thecodingtrain.com/CodingChallenges/051.1-astar.html
// - https://en.wikipedia.org/wiki/A*_search_algorithm
// *****************************************************************************


function detectMax() {
  try {
    window.max.outlet('Hello Max!');
    return true;
  }
  catch(e) {
    console.log('Max, where are you?');
  }
  return false;
}

var s = function(p) {
  var maxIsDetected = detectMax();
  console.log('Max, where are you?');
  var background_r = 0; var background_g = 0; var background_b = 0;
  var stroke_r = 255; var stroke_g = 255; var stroke_b = 255;
  var opaqueFlag = true;
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

  p.windowResized = function() {
    p.resizeCanvas(innerWidth, innerHeight, this.WEBGL);

  }

  p.removeFromArray = function(arr, elem) {
    for (var i = arr.length-1; i >= 0; i--){
      if (arr[i] == elem){
        arr.splice(i, 1);
      }
    }
  }

  p.heuristic = function(a,b) {
    var d = p.abs(a.i-b.i)+p.abs(a.j-b.j);
    return d;
  }

   p.Spot = function(i,j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.col = 255;
    this.neighbors = [];
    this.previous;
    this.wall = false;

    if (p.random(1) < 0.2) {
      this.wall = true;
    }

    this.show = function(){
      //translate(-windowWidth/4 + space, -windowHeight/4+space);
      p.fill(this.col);
      if (this.wall) {
        p.noStroke(0);
        p.fill(0);
      }
      else {
        p.stroke(stroke_r,stroke_b, stroke_g);
      }

      p.box(boxSize);
      if (p.frameCount % 20 ==0 || p.frameCount % 21 ==0 || p.frameCount % 22 ==0) {
        p.rotate(Math.sin(p.frameCount/100000)+Math.cos(-p.frameCount/100000));
      }
      if (p.frameCount % 44 ==0 || p.frameCount % 45 ==0 || p.frameCount % 46 ==0 || p.frameCount % 47 ==0 ||p.frameCount % 48 ==0){
        p.rotate(Math.tan(p.frameCount/100000)-Math.cos(-p.frameCount/100000));
      }
    }
    this.setCol = function(col){
      this.col = col;
    }

    this.addNeighbors = function(grid){
      var i = this.i;
      var j = this.j;
      if (i < cols-1){
        this.neighbors.push(grid[i+1][j]);
      }
      if (i > 0){
        this.neighbors.push(grid[i-1][j]);
      }
      if ( j < rows-1){
        this.neighbors.push(grid[i][j+1]);
      }
      if (j > 0){
        this.neighbors.push(grid[i][j-1]);
      }
    }
  }


  p.setup = function() {
    p.frameRate(10)
    p.createCanvas(innerWidth, innerHeight, this.WEBGL);
    if(maxIsDetected) {
      // remove unwanted scroll bar
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      /*
        Bind functions, which we want to have available from patcher's
        level. For more information check the "Communicating with Max from
        within jweb" document (part of Max documentation).
      */
      window.max.bindInlet('set_background_color', function (_r, _g, _b) {
        background_r = _r; background_g = _g; background_b = _b;
        if(opaqueFlag) p.background(background_r, background_g, background_b);
      });
      window.max.bindInlet('set_opaque', function (_flag) {
        opaqueFlag = _flag;
        /*
          "clear" is is a method that is generally equivalent to the
          "background" method with the difference that instead of filling the
          entire surface of the canvas with a solid color, it fills them with
          zeros (color(0,0,0,0)) - also the alpha component is filled with
          zeros - that is, the canvas becomes completely transparent.
        */
        if(!opaqueFlag) p.clear();
      });
      window.max.bindInlet('set_stroke_color', function (_r, _g, _b) {
        stroke_r = _r; stroke_g = _g; stroke_b = _b;
      });
      window.max.bindInlet('parse_dict', function (_dict_name) {
        window.max.getDict(_dict_name, function(_dict) {
          window.max.outlet('parse_dict', 'start parsing...');
          for(var _key in _dict) {
            if (_dict.hasOwnProperty(_key)) {
              window.max.outlet('parse_dict', _key + ' ' + _dict[_key]);
            }
          }
          window.max.outlet('parse_dict', '... parsing finished');
        });
      });
    }
    console.log('A*');

    for (var i = 0; i < cols; i++){
      grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++){
      for (var j = 0; j < rows; j++){
        grid[i][j] = new p.Spot(i,j);
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
    end.setCol(p.color(100,50,100));
    openSet.push(start);
    console.log(openSet)

  }

  p.draw = function() {
    if(opaqueFlag) {
      if(p.mouseIsPressed){
        p.background(25, 20, 20);
        p.rotateX(-30*Math.cos(p.mouseX/100), -30*Math.sin(p.mouseY/100));
        p.rotateY(-30*Math.cos(p.mouseX/100), -30*Math.sin(p.mouseY/100));
      }
      else
        p.background(background_r, background_g, background_b);
    }
    if (openSet.length > 0){
      var winner = 0;
      for (var i = 0; i < openSet.length; i++){
        if (openSet[i].f < openSet[winner].f){
          winner = i;
        }
      }

      var current = openSet[winner];
      if (current === end){
        console.log('Done');
      }
      p.removeFromArray(openSet, current);
      closedSet.push(current);

      var neighbors = current.neighbors;
      for ( var i = 0; i < neighbors.length; i++){
        var neighbor = neighbors[i];
        if (!closedSet.includes(neighbor) && !neighbor.wall){
          var tempG = current.g + 1;
          if (openSet.includes(neighbor)){
            if (tempG < neighbor.g){
              neighbor.g = tempG;
            }
          }else {
            neighbor.g = tempG;
            openSet.push(neighbor);
          }
          neighbor.h = p.heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }

    } else {
      console.log('No Solution')
    }
    p.stroke(stroke_r,stroke_b, stroke_g);
    p.rotateY(p.frameCount/80);
    p.translate(0,150,0)
    for (var i = 0; i < cols; i++){
      p.translate(boxSize*2,-cols*2*boxSize,0);
      p.rotateX(p.frameCount/1500);
      for (var j = 0; j < rows; j++){
          p.translate(0,boxSize*2,0);
          grid[i][j].show();
      }
    }

    for (var i = 0; i < closedSet.length; i++){
      closedSet[i].setCol(p.color(255,0,0));
    }

    for (var j = 0;j < openSet.length; j++){
      openSet[j].setCol(p.color(0,0,255));
    }

    path = [];
    var temp = current;
    path.push(temp);
    console.log(temp.previous);
    if (temp.previous)
    while (temp.previous){
      path.push(temp.previous);
      temp.previous.setCol(p.color(0,255,0));
      temp = temp.previous;
    }


    for (var i =0; i < path.legnth; i++){
      path[i].setCol(p.color(0,255,0));
      console.log(path[i]);
    }
  }
}

var myp5 = new p5(s);
