function getBlockOrder(numBlocks){
  // switch (blockOrderNum) {
  //   case 1:
  //     return ["A", "B", "D", "C"];
  //   case 2:
  //     return ["B", "C", "A", "D"];
  //   case 3:
  //     return ["C", "D", "B", "A"];
  //   case 4:
  //     return ["D", "A", "C", "B"];
  // }
  return shuffle(["A", "B", "C"]).slice(0, numBlocks);
}

function getBlockParameters(blockLetter) {
  var thisBlock = {
    switchProp: 0.5,
    // repeat: 1-switchProp,
    // ct_con: 1-incProp,
    incProp: 0.5
  };

  switch (blockLetter){
    case "A":
      thisBlock.cueCoh = cohEasy;
    case "B":
      thisBlock.cueCoh = cohMed;
    case "C":
      thisBlock.cueCoh = cohHard;
  }

  return thisBlock;
}

function get_task_image(num){
  switch (taskMap) {
    case 1:
      if (pracOrder == num) { //task is parity
        return (colorMapping == 1) ? 3 : 11;
      } else { //task is magnitude
        return (colorMapping == 1) ? 4 : 12;
      }
    case 2:
      if (pracOrder == num) { //task is parity
        return (colorMapping == 1) ? 5 : 13;
      } else { //task is magnitude
        return (colorMapping == 1) ? 6 : 14;
      }
    case 3:
      if (pracOrder == num) { //task is parity
        return (colorMapping == 1) ? 7 : 15;
      } else { //task is magnitude
        return (colorMapping == 1) ? 8 : 16;
      }
    case 4:
      if (pracOrder == num) { //task is parity
        return (colorMapping == 1) ? 9 : 17;
      } else { //task is magnitude
        return (colorMapping == 1) ? 10 : 18;
      }
  }
}

function first_task(){
  if (pracOrder == 1) {
    if (taskMap == 1 || taskMap == 2) {
      return "odd or even";
    } else {
      return "even or odd";
    }
  } else {
    if (taskMap == 1 || taskMap == 3) {
      return "greater or less than five";
    } else {
      return "less or greater than five";
    }
  }
}

function second_task(){
  if (pracOrder == 1) {
    if (taskMap == 1 || taskMap == 3) {
      return "greater or less than five";
    } else {
      return "less or greater than five";
    }
  } else {
    if (taskMap == 1 || taskMap == 2) {
      return "odd or even";
    } else {
      return "even or odd";
    }
  }
}

// options 1,1; 1,2; 2,1; 2,2
function task_instruction(task_num, finger_num){
  if (task_num == 1) {
    if (pracOrder == 1) {
      return (finger_num == 1) ? parity_z : parity_m;
    } else {
      return (finger_num == 1) ? magnitude_z : magnitude_m;
    }
  } else {
    if (pracOrder == 1) {
      return (finger_num == 1) ? magnitude_z : magnitude_m;
    } else {
      return (finger_num == 1) ? parity_z : parity_m;
    }
  }
}

function colorFirstTask(){
  if (pracOrder == 1){ //parity first
    return parityColor;
  } else { // magnitude first
    return magnitudeColor;
  }
}

function colorSecondTask(){
  if (pracOrder == 1){ //parity first so magnitude second
    return magnitudeColor;
  } else { // maagnitude first so parity second
    return parityColor;
  }
}


function getFirstPracticeTask(){
  return (pracOrder == 1) ? "p" : "m";
}

function getSecondPracticeTask(){
  return (pracOrder == 1) ? "m" : "p";
}
