let boids;

function setup() {
  createCanvas(windowWidth, windowHeight);
  boids = [];
  background(220);
  textFont("Arial", 36);
  fill(0);
  text("Imagen Escrita 2021", 20, 48);
}

function draw() {
  
  for(let i = 0; i < boids.length; i++){
    boids[i].draw();
    boids[i].go();
    if(boids[i].t < 1){
      // sáquelo del arreglo
      boids.splice(i, 1);
    }
  }
}

class Boid {
  constructor(x, y, t, a) {
    this.x = x;
    this.y = y;
    this.t = t; // tamaño
    this.a = a; // ángulo
    this.seed = round(random(0, 999999));
  }

  draw() {
    fill(255, 120);
    stroke(0, 70);
    push();
    translate(this.x, this.y);
    rotate(this.a);
    beginShape();
    vertex(-this.t, -this.t*1.5);
    vertex(this.t*3, 0);
    vertex(-this.t, this.t*1.5);
    endShape(CLOSE);
    pop();
  }
  
  go(){
    noiseSeed(this.seed);
    this.a += (noise(millis()/800) - 0.5) * 0.333;
    
    this.x += cos(this.a) * 2;
    this.y += sin(this.a) * 2;
    
    this.t *= 0.996;
    
    if(unoEn(80)){
      let nuevaRama = new Boid(this.x, this.y, this.t * 0.9, random(-1, 1)*HALF_PI);
      boids.push(nuevaRama)
    }
  }
}


function mousePressed(){
  let b = new Boid(mouseX, mouseY, 10, -HALF_PI);
  boids.push(b);
}

function keyTyped(){
  if(key === " "){
      background(220);
  }
  if(key === "b"){
    print("hay "+boids.length+" boids!!!")
  }
}

function unoEn(num){
  let n = random(0, num);
  if(n < 1){
    return true;
  }else{
    return false;
  }
}