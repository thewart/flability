// Fisher-Yates shuffle
function shuffle(array){
  for(let j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
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
