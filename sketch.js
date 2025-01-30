let raindrops = [];
let walkers = [];

let userInput;
let button;
let font1;  

function preload() { 
  font1 = loadFont('BodoniModa-VariableFont_opsz,wght.ttf'); 
}
function setup() {
  createCanvas(600, 600);
  textFont(font1); 
  noStroke();

  for (let i = 0; i < 300; i++) {
    raindrops.push(new Raindrop(random(width), random(-height, 0)));
  }

  for (let i = 0; i < 50; i++) {
    walkers.push(new Walker(random(width), random(3 * height / 4, height)));
  }

  userInput = createInput();
  userInput.position(40, 100);
  userInput.style('backgroundColor', '#7C44FF')
  userInput.style('border', '2px solid white');
  userInput.style('color', 'white');

  button = createButton('Ready?');
  button.style('backgroundColor', 'transparent');
  button.style('border', '2px solid white');
  button.style('color', 'white');
  button.position(userInput.x + userInput.width + 10, userInput.y);
  button.mousePressed(nonsenseLine);
}

let poem = [];
let nVerses = 4;

function nonsenseLine() {
  poem = [];
  let currentLine = userInput.value();

  for (let i = 0; i < nVerses; i++) {
    poem.push(currentLine);

    let rhymed = makeRhymedLine(currentLine);
    poem.push(rhymed);

    currentLine = changeAllNouns(rhymed);
    currentLine = changeAllVerbs(currentLine);
    poem.push("");
  }

  let syllables = findANoun(userInput.value());
  poem.push(RiTa.syllables(syllables));
}

function makeRhymedLine(line) {
  let words = RiTa.tokenize(line);
  let r = floor(random(0, words.length));
  let rhymes = RiTa.rhymesSync(words[r]);

  if (rhymes.length > 0) {
    let changedWord = random(rhymes);
    words[r] = changedWord;
    line = RiTa.untokenize(words);
  }

  return line;
}

function findANoun(line) {
  let words = RiTa.tokenize(line);
  let noun = "";

  for(let i = 0; i < words.length; i++) {
    if(RiTa.isNoun(words[i]))
      return words[i];
  }

  return noun;
}

function changeAllNouns(line) {
  let words = RiTa.tokenize(line);

  for (let i = 0; i < words.length; i++) {
    if (RiTa.isNoun(words[i]))
      words[i] = randomNoun();
  }

  line = RiTa.untokenize(words);

  return line;
}

function changeAllVerbs(line) {
  let words = RiTa.tokenize(line);

  for (let i = 0; i < words.length; i++) {
    if (RiTa.isVerb(words[i]))
      words[i] = randomVerb();
  }

  line = RiTa.untokenize(words);

  return line;
}

function randomNoun() {
  let word = RiTa.randomWord();

  while(!RiTa.isNoun(word)) {
    word = RiTa.randomWord();
  }

  return word;
}

function randomVerb() {
  let word = RiTa.randomWord();

  while(!RiTa.isVerb(word)) {
    word = RiTa.randomWord();
  }

  return word;
}

function draw() {
  background(20, 20, 40);
  textSize(15)
  text('A Rainy Day Poem\n Enter a Sentence', 40, 70); 


  for (x = 0; x < poem.length; x++) {
    text(poem[x], 40, 180 + x * 20);
  }

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