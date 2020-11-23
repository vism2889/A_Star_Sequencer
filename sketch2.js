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
// *****************************************************************************


function detectMax() {
  try {
    /*
      For references to all functions attached to window.max object read the
      "Communicating with Max from within jweb" document from Max documentation.
    */
    window.max.outlet('Hello Max!');
    return true;
  }
  catch(e) {
    console.log('Max, where are you?');
  }
  return false;
}

/*
  Here we are creating actual P5js sketch in the instance mode
  (look at https://github.com/processing/p5.js/wiki/p5.js-overview
  for details about P5js instantiation and namespace) to prevent
  binding P5js functions and variables to the "window" object. Thanks
  of that we can avoid namespaces conflict between Max and P5js.
*/
//let extraCanvas;
var s = function(p) {

  // let's test and memorize if the sketch is loaded inside Max jweb object
  var maxIsDetected = detectMax();

  // a few variables to store color data (just for this example sketch)
  var background_r = 0; var background_g = 0; var background_b = 0;
  var stroke_r = 255; var stroke_g = 255; var stroke_b = 255;
  // flag to control switching between opaque and transparent background
  var opaqueFlag = true;

  /*
    Use windowResized function to adopt canvas size to the current size of
    the browser. It is particularly important when sketch is loaded inside
    the Max jweb object, which may be dynamically resized by the user.
  */
  p.windowResized = function() {
    p.resizeCanvas(innerWidth, innerHeight, this.WEBGL);

  }
  var img;

  p.setup = function() {

    p.createCanvas(innerWidth, innerHeight, this.WEBGL);

    img = p.loadImage("a_star_anime_girl.png");
    

    /*
      If the sketch is loaded inside Max jweb object we will carry out
      the necessary tasks to establish communitation between the patcher
      and the sketch (and to tune the sketch itself to present itself
      correctly when operating inside the jweb.
    */
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
  };

  var x,y,z;
  x=1;
  y=1;
  z=1;
  var num=1;
  var fc = 0;
  p.draw = function() {
    // let's draw something using P5js buld-in functions
    if(opaqueFlag) {
      if(p.mouseIsPressed)
      {
        p.background(25, 20, 20);
        //p.fill(200);
        p.rotateX(-30*Math.cos(p.mouseX/100), -30*Math.sin(p.mouseY/100));
        p.rotateY(-30*Math.cos(p.mouseX/100), -30*Math.sin(p.mouseY/100));
      }
      else
        p.background(background_r, background_g, background_b);
    }

    p.stroke(stroke_r, stroke_g, stroke_b);

    //if (p.frameCount > 40)
      //p.rotateY(Math.sin(p.frameCount/20));
    //p.rotateZ(p.frameCount/100);
    p.rotateZ(Math.cos(p.frameCount/100)-Math.sin(p.frameCount/100));
    for (let i = 1; i < 10; i++)
    {
      //p.ellipse(i*100, i*100, 80, 80);
      //p.noFill();
      p.fill(i*25, 0, 0, 20);
    //  p.box(i*10, i*10, i*10);
      //p.translate(Math.sin(p.frameCount/2+x)+Math.cos(p.frameCount/2+y), Math.cos(p.frameCount/2+y+500),p.frameCount-z-i*10);
      //p.rotate(Math.sin(p.frameCount/20));

    }


    p.translate(-125,-100,-200);
    //p.translate(0,0,fc);
    for (let i = 1;i <=10;i++)
    {
      for (let j = 1; j<= 10;j++)
      {
        p.fill(j*25, j*10, j,20*(i/2));
        if (i==10 && j==10)
        {
          p.fill(205,125,0,200);
        }
        if (i==num && j==num)
        {

          p.fill(20,200,0,100);
          //p.translate(0,0,100);

        }


        p.box(20,20,20);
        if (p.frameCount % 20 ==0 || p.frameCount % 21 ==0 || p.frameCount % 22 ==0)
        {
          p.rotate(Math.sin(p.frameCount/100000)+Math.cos(-p.frameCount/100000));
          //window.max.outlet('hh', 0);
        }
          if (p.frameCount % 44 ==0 || p.frameCount % 45 ==0 || p.frameCount % 46 ==0 || p.frameCount % 47 ==0 ||p.frameCount % 48 ==0)
          {
            p.rotate(Math.tan(p.frameCount/100000)-Math.cos(-p.frameCount/100000));
            //p.translate(0,0,10);
            //p.translate(0,0,-10);
            //window.max.outlet('hh', 0);
          }


        p.translate(30,0,0);




      }
      p.translate(-300,30,0);
      //p.rotate(50*i);
    }

    if (fc==30)
    {
      num+=1;
      window.max.outlet('bd', 0);
      fc = 0;

    }
    if (p.frameCount%30==0 || p.frameCount%37==0)
    {
      window.max.outlet('hh', 0);
    }
    if (num >10)
    {
      num = 1;
    }

    fc +=1;
    // max stuff
    if(maxIsDetected) {
      window.max.outlet('status', p.frameCount, p.mouseIsPressed);
      var dict_obj = {
        frame_count: p.frameCount,
        mouse_pressed: p.mouseIsPressed
      };
      window.max.setDict('status_dict', dict_obj);
      window.max.outlet('status_dict_updated');
    }

  };

};


var myp5 = new p5(s);
