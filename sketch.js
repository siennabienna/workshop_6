let raindrops = [];
let walkers = [];

function setup() {
  createCanvas(600, 600);
  noStroke();

  for (let i = 0; i < 300; i++) {
    raindrops.push(new Raindrop(random(width), random(-height, 0)));
  }

  for (let i = 0; i < 50; i++) {
    walkers.push(new Walker(random(width), random(3 * height / 4, height)));
  }
}

function draw() {
  background(20, 20, 40);

  for (let i = raindrops.length - 1; i >= 0; i--) {
    raindrops[i].update();
    raindrops[i].show();

    if (raindrops[i].offScreen()) {
      raindrops.splice(i, 1);
      raindrops.push(new Raindrop(random(width), random(-100, 0)));
    }
  }

  for (let walker of walkers) {
    walker.update();
    walker.show();
  }
}

class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = random(0, 20);
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 1, 20);
  }

  update() {
    this.y += this.yspeed;
    let grav = map(this.z, 0, 20, 0, 0.2);
    this.yspeed += grav;
  }

  show() {
    let thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(thick);
    stroke(138, 43, 226);
    line(this.x, this.y, this.x, this.y + this.len);
  }

  offScreen() {
    return this.y > height;
  }
}

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 10);
    this.color = color(random(100, 255), random(100, 255), random(200, 255), 150);
  }

  update() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
    this.y = constrain(this.y, 3 * height / 4, height); // Constrain movement to bottom quarter
  }

  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}