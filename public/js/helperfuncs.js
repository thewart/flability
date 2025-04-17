// Fisher-Yates shuffle
function shuffle(array){
  for (let j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
}

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key] === value);
const getAllKeysByValue = (obj, value) => Object.keys(obj).filter(key => obj[key] === value);

const repeat = (arr, n) => arr.flatMap(item => Array(n).fill(item));
var repeatEach = (arr, n) => arr.flatMap((item, index) => Array(n[index]).fill(item));

function zipArrays(arr1, arr2) {
  return arr1.map((element, index) => [element, arr2[index]]);
}

function randIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawMultilineText(text, x, y, lineHeight) {
  const lines = text.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + (i * lineHeight));
  }
}

function isEven(n) {
  return n % 2 == 0;
}

function isOdd(n) {
  return Math.abs(n % 2) == 1;
}

function intersect(arrA, arrB) {
  return arrA.filter(x => arrB.includes(x))
}

resetText = function() {
  ctx.fillStyle = "black";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
}

drawExampleStim = function(color, stim, respWhich, elemName, disp, cueProp = 1.0) {
  let textd = 60;
  let lined = 25;
  let cueOpts = {lineWidth: 7, numSegments: 6, radius: 75, offsetY:-40};
  let stimOpts = {fontSize: 45, offsetY:-35}
  let x0 = ctx.canvas.width/2;
  let y0 = ctx.canvas.height/2
  drawCircleCue((color === colorA) ? cueProp : 1-cueProp, Object.assign(cueOpts, {offsetX: disp}));
  drawStimulus(stim, Object.assign(stimOpts, {offsetX: disp}));
  resetText();
  drawMultilineText("Press '" + respWhich + "' for the \n" + elemName, x0 + disp, y0 + textd, lined)
}

getRandStim = function(respMap, respWhich) {
  return _.sample(getAllKeysByValue(respMap, respWhich));
}

