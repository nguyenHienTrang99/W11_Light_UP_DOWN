let serial; 
let bright = 0; 
let dark, light; 

// Kết nối từ Arduino qua P5JS 
function setup() {
  createCanvas(windowWidth,windowHeight);
  dark = color(0);
  light = color(255, 0 , 0);
  serial = new p5.SerialPort();
  serial.open('COM4'); // Cổng nối
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
  // Biến này để tạo nhiều sao
  let hcn = 1.0;  
  let hcd = 0.1; 
  // Tạo bản đồ sáng tối 
  drawGradient(dark, light);
  // Tạo thanh di chuyển
  stroke(255);
  strokeWeight(3);
  noFill();
  ellipse(mouseX, mouseY, 10, 10);
  // Tạo mặt trời
  push();
  translate(width * 0.5, height * 0.75);
  rotate(frameCount / 50.0);
  star(0, 0, 20, 100, 20);
  pop();
  // Tạo sao
  for(var i = 0 ; i < 12 ; i++){
    push();
    translate(width * hcn, height * hcd);
    rotate(frameCount / -100.0); 
    star(0, 0, 30, 70, 5);
    pop();
    hcn -= 0.17 ; 
  } 
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

// Ánh xạ ánh sáng theo hướng dọc 
function mouseDragged(){
  bright = floor(map(mouseY, 0, windowHeight, 0, 255));
  bright = constrain(bright, 0, 255);
  // Serial nhan tin hieu va phat anh sang o cap do tuong ung
  serial.write(bright);
  console.log(bright);
}
