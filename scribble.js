var img1; //variable to load the previous scribble

//colors of the scribble
var coloreUno = '';
var coloreDue = '';

var path;

var phpImage;

var drawing = [];
var currentPath = [];
var erase = 0;
var isDrawing = false;
var isErasing = false;

var k = Math.random() * (1.9 - 1.3) + 1.3; // create random variables to scale and move the sketch that you have to complete
var fx = Math.random() * (1080 / 8 * ((k - 1) / k) - 1); // use of Math.round because it is before draw function and it is global
var fy = Math.random() * (1920 / 8 * ((k - 1) / k) - 1);

function preload() {
  img1 = loadImage(phpImage);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(startPath);
  canvas.parent('createImg');
  canvas.mouseReleased(endPath);
  canvas.mouseOut(endPath);
  console.log(phpImage);
  image(img1, 0, 0, 1080 / 5, 1920 / 5)
  coloreUno = get(0, 0);
  coloreDue = get(3, 0);
  print("scoloreUno: " + coloreUno, "scoloreDue: " + coloreDue);
  //image(img1, 0, 0, 1080 / 5, 1920 / 5)
  //print("ScoloreUno: " + coloreUno, "ScoloreDue: " + coloreDue);
}

//start drawing, hiding scribble's controller buttons and store the drawn path in the drawing array
function startPath() {
  $('#controller').fadeOut('fast')
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function touchStarted() {
  $('#controller').fadeOut('fast')
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
  return false;
}

//scribble's controller buttons reapper
function endPath() {
  $('#controller').fadeIn('fast')
  isDrawing = false;
}

function touchEnded() {
  $('#controller').fadeIn('fast')
  isDrawing = false;
}

//overwriting the array to delete the scribble just drawn
function eraseLine() {
  drawing = [];
}

console.log(Math.round(fx), Math.round(fy), Math.round(k));

function draw() {

  push()
    // translate(fx * 4, fy * 4); // translate the whole sketch
    // scale(1 / k); // scale of the sketch

    background(coloreUno);

  pop()

  push()
    translate(fx, fy); // translate of the whole sketch
    scale(1 / k); // scale of the sketch

    if (isDrawing) {
      var point = {
        x: (mouseX - fx) * k, // compensation of translate and previous sketch, both in x and in y
        y: (mouseY - fy) * k
      };
      currentPath.push(point);
    }

    stroke(coloreDue);
    strokeWeight(5);
    noFill();

    for (var i = 0; i < drawing.length; i++) {
      path = drawing[i];
      beginShape();
      for (var j = 0; j < path.length; j++) {
        vertex(path[j].x, path[j].y);
      }
      endShape();
    }
  pop()

  translate(fx * 4, fy * 4); // translate of the whole sketch
  scale(1 / k); // scale of the sketch

  image(img1, 0, 0, 1080 / 5, 1920 / 5)
  push()
    scale(k); // scale of the sketch
    translate(-fx * 4, -fy * 4); // translate of the whole sketch
    noStroke()
    //creating 2 squares to store the right colors
    fill(coloreDue)
    rect(0, 0, 3, 3)
    fill(coloreUno)
    rect(3, 0, 6, 3)
  pop()
}
