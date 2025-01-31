# workshop_6

Website: https://siennabienna.github.io/workshop_6/

# Things I Looked at in this Workshop 
- learning to use RiTa functions
- learning to load fonts into a sketch
- forking a repository
- changing colour of user input events

# Using RiTa Functions

I followed the workshop tasks video and created my own simple rhyming poem. I started off by finding a free font off Google as an TTF. This allowed me to change the font of the text of the title and the poem. 

```js
function preload() { 
font1 = loadFont('BodoniModa-VariableFont_opsz,wght.ttf'); 
}
```

To acess the Rita library from my code, I added the link that was on its Github to the index.html. Next, I created a simple user input and button so that text could be entered and then confirmed. 

By continuing to follow the workshop video, I was able to create this code:

```js
let font1; 
let s = 'By You'; 
let userInput; 
let button; 
let userLine; 
let poem = []; 

function preload() { 
font1 = loadFont('BodoniModa-VariableFont_opsz,wght.ttf'); 
} 

function setup() { 
createCanvas (400, 580); 
textFont(font1); 
userInput = createInput(); 
userInput.position (40, 100); 
button = createButton ('add to poem'); 
button.position (userInput.x, userInput.y + 21); 
button.mousePressed (newLine); 
} 

function draw() { 
background (220); 
text('Poem', 40, 50); 
text(s, 40, 70); 
writePoem(); 
}

function newLine(){ 
  userLine = userInput.value(); 
  userInput.value(''); 
  poem.push(userLine); 

let words = RiTa.tokenize(userLine);
let r = floor(random(0, words.lenth));
let rhymes = RiTa.rhymesSync(words[r]);
  if (rhymes.length > 0){
  //   poem.push(userLine);
  // } else{
let changedWord = random(rhymes);
words[r] = changedWord;
userLine = RiTa.untokenize(words);
poem.push(userLine);
  }

  } 
  function writePoem() { 
  for(x = 0; x < poem.length; x++){ 
  text(poem[x], 40, 180 + x * 20); 
  } 
  }
```

This taught me how to use the rhyme and tokenize funtions. Rhyme finds words in the library that rhyme with a given word, which I select at random from the user's input and then replace with the rhymed word. However, this can't be done without tokenizing the words first, to seperate them from a whole sentence into individual words to then be selected at random. To select them at random, an array needed to be made in order to create the options that can be selected. In my poem, I decided to make it so that the user's input would be visible as well as the updated line, so that the rhyme is evident and it behaves more like a stanza in a poem.

After learning how to use these functions, I was ready to try some more.

# Forking a Repository

I decided to fork from Jeff Cai's workshop 7.
Link to GitHub Repository: https://github.com/Jeffcai0502/workshop-task-7

![image](https://github.com/user-attachments/assets/adccc184-b0f4-4121-8ee3-8ce43c403216)


I loved the way they used the objects to create the rain splatters. I thought it was very nice and calming, and would work well with a poem.

After forking this, I opened it with VSCode, and then added the poem code I had made earlier on top. I wanted to add more functions to this, but this would work as a good basis for the poem. I decided that the poem would start off with a rhyme, and then replace a noun from the sentence for the next line, and then a verb, and then spelled out the syllables of a random word from the users orignial function. To do this, I wrote this code:

```js
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
```
This code allowed me to make a new line for each of the RiTa functions. If Rita found no replacement words, it would also just keep the line before it the same. Next, I wanted to change the colour of the user input and the button to match the rain. I asked my friend Ghen for help on this, and he helped me write this code by using CSS:

```js
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
```

I learned that CSS is a set of instructions for customizing the appearance of objects like buttons and input boxes, and works a bit like the `.position` instruction.

I was very happy with the colours!

One issue that I encountered whilst coding this is that if the user's input is too long, the text will just go off the screen. I found that this would be difficult to fix by keeping the poem lines as text, but could be fixed if I changed it from text to spans. However, due to time constrains I decided to just leave it as it is, and keep this issue in mind for future projects.

# Ideas for Further Development
- Find a way to access the library and select some better rhymes so that the poem could make more sence
- Improve on the forked rain code so that the objects are ellipses that can expland when they hit a certain Y value so that they look more like rain melting into a puddle
- Find a way to link the rain code better with the poem's concept, parhaps changing the moving raindrops into vertical words as a responce to the user's inputs.
