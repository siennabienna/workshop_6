# workshop-task-7
FA205_Workshop_7

# workshop-task-7
Here is a URL to the webpage for this project: [link]( )

## Task
- Build a simulation of a real or imagined entity or environment.
- Experiment with random walks and/or particle systems in your sketch.
- Make a new repository for your p5.js project on your GitHub account, publish your sketch as a webpage, and include a README file in your repository with a URL to the webpage along with documentation of your work.

## Workshop notes

<img width="1255" alt="截屏2025-01-30 上午7 09 05" src="https://github.com/user-attachments/assets/bf3a7b98-2c5a-48c3-ba42-edd573c0a221" />

- Random walk

<img width="1255" alt="截屏2025-01-30 上午7 10 34" src="https://github.com/user-attachments/assets/13c76ca8-bd52-4782-926c-8f44cc6e9c47" />

## Task

Constructor: Initializes the position, size, and color of each particle.

Update Method: Updates the position of the particle with random movement.

Show Method: Displays the particle as an ellipse.

CheckEdges Method: Constrains the particle within the canvas boundaries.

- Used the particle system to create a rainy effect. We'll simulate raindrops falling from the top of the canvas and add some visual effects to make it look like rain.

## Version 1

- Raindrop Class: Defines a Raindrop class with properties for position, speed, and length. The update method updates the position of the raindrop, and the show method displays the raindrop as a line.

<img width="597" alt="截屏2025-01-30 上午7 20 36" src="https://github.com/user-attachments/assets/504a47aa-99c8-4786-bc3a-6bf698659a4a" />

## Version 2
  
Added random walk:

Walker Class: Defines a Walker class with properties for position, size, and color. 

<img width="597" alt="截屏2025-01-30 上午7 24 41" src="https://github.com/user-attachments/assets/d9e186d3-bd6b-4984-9a55-d358ced03a21" />

Walker Initial Position: In the setup function, the initial positions of the walkers are set to be within the bottom quarter of the canvas using random(width), random(3 * height / 4, height).

```ruby
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
```
