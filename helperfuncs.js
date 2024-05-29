// Fisher-Yates shuffle
function shuffle(array){
    for(let j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
  }
  
  function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  var getKeyByValue = (obj, value) => 
          Object.keys(obj).find(key => obj[key] === value);