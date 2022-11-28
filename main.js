let serial; 
let bright = 0; 
let dark, light; 

function setup() {
  createCanvas(512, 512);
  dark = color(0);
  light = color(255, 0 , 0);
  serial = new p5.SerialPort();
  serial.open('COM4');
}

function drawGradient(c1, c2) {
  noFill();
  for (let y = 0; y < height; y++) {
    let interp = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, interp);
    stroke(c);
    line(0, y, width, y);
  }
}

function draw() {
  drawGradient(dark, light);
  stroke(255);
  strokeWeight(3);
  noFill();
  ellipse(mouseX, mouseY, 10, 10);
  push();
  translate(width * 0.5, height * 0.75);
  rotate(frameCount / 50.0);
  star(0, 0, 20, 100, 20);
  pop();
  push();
  translate(width * 0.5, height * 0.25);
  rotate(frameCount / -100.0);
  star(0, 0, 30, 70, 5);
  pop();
} 

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mouseDragged(){
  bright = floor(map(mouseY, 0, 512, 0, 255));
  bright = constrain(bright, 0, 255);
  serial.write(bright);
  console.log(bright);
}
