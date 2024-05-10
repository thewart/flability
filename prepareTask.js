function createPracticeArrays(nTrials, task){
  // let taskStimuliPairs = createPracticeStimPairs(nTrials, task);
  incSet = createBinaryArray(nTrials, 0.5, ["i", "c"]);
  taskStimuliSet = createTargetsArray(incSet);
  if (task == "") {
    switchSet = createBinaryArray(nTrials-1, 0.5, ["s", "r"]).unshift(null);
    cuedTaskSet = createTaskArray(switchSet);
  } else {
    cuedTaskSet = Array(nTrials).fill(task);
  }
  cueCohereSet = createCueCohArray(nTrials, cohEasy);
  actionSet = createActionArray();
}

function createArrays(trialsPerBlock){
  let blockParams;
  // write over practice block
  taskStimuliSet = []; cuedTaskSet = []; switchSet = []; incSet = [], cueCohereSet = [];

  blockOrder.forEach(function(blockLetter){
    blockParams = getBlockParameters(blockLetter);
    // create arrays for target and task based on congruencies
    let incBlock = createBinaryArray(trialsPerBlock, blockParams.incProp, ["i", "c"]);
    let switchBlock = createBinaryArray(trialsPerBlock-1, blockParams.switchProp, ["s", "r"]).unshift(null);

    cuedTaskSet = cuedTaskSet.concat(createTaskArray(switchBlock));
    cueCohereSet = cueCohereSet.concat(createCueCohArray(trialsPerBlock, blockParams.cueCoh));
    switchSet = switchSet.concat(switchBlock);
    incSet = incSet.concat(incBlock);
  });

  taskStimuliSet = createTargetsArray(incSet);
  actionSet = createActionArray();
}

function createBinaryArray(batchSize, prop, labels){
  // calc how mnay congruent/incongruent trials are needed
  
  let arr = [];
  let i = 0;
  while (i < batchSize) {
    i++;
    thisTrial = Math.random() < prop ? labels[0] : labels[1];
    arr.push(thisTrial);
  }

  return arr;
}

// creates task array (responding globally or locally)
function createTaskArray(switchSet){
  let nTrials = switchSet.length;
  let taskA = "m", taskB = "p";
  let taskArr = [];
  let thisTask, prevTask;

  prevTask = Math.random() > 0.5 ? taskA : taskB;
  taskArr.push(prevTask);
  // let task2 = (task1 == taskA) ? taskB : taskA;
  let i = 1;
  while (i < nTrials) {
    isSwitch = switchSet[i];
    if (isSwitch) {
      thisTask = (prevTask==taskA) ? taskB : taskA;
    } else {
      thisTask = prevTask;
    }
    taskArr.push(thisTask);
    prevTask = thisTask;
    
    i++;
  }
  
  return taskArr;
}

function createCueCohArray(nTrials, cueCoh) {
  return Array(nTrials).fill(cueCoh);
}

// create what correct answer on each trial is
function createTargetsArray(congruenciesArr){
  let nTrials = congruenciesArr.length;
  let targetsArr = [];
  for (let i = 0; i < nTrials; i++) {
    if (congruenciesArr[i] == "c") {
      if (taskMapping == 1 || taskMapping == 4) {
        if (i != 0) {
          targetsArr.push(_.sample([2,4,7,9].filter(n => n != targetsArr[i - 1])));
        } else {
          targetsArr.push(_.sample([2,4,7,9]));
        }
      } else {
        if (i != 0) {
          targetsArr.push(_.sample([1,3,6,8].filter(n => n != targetsArr[i - 1])));
        } else {
          targetsArr.push(_.sample([1,3,6,8]));
        }
      }
    } else {
      if (taskMapping == 1 || taskMapping == 4) {
        if (i != 0) {
          targetsArr.push(_.sample([1,3,6,8].filter(n => n != targetsArr[i - 1])));
        } else {
          targetsArr.push(_.sample([1,3,6,8]));
        }
      } else {
        if (i != 0) {
          targetsArr.push(_.sample([2,4,7,9].filter(n => n != targetsArr[i - 1])));
        } else {
          targetsArr.push(_.sample([2,4,7,9]));
        }
      }
    }
  }
  return targetsArr;
}

function createActionArray(){
  let responseMappings = {
    1: {
      taskA : [codeL, codeR],
      taskB : [codeL, codeR]
    },
    2: {
      taskA : [codeR, codeL],
      taskB : [codeR, codeL]
    },
  };

  // for each stimulus and associated task, identify required action for correct response
  let actionArr = [];
  taskStimuliSet.forEach(function(taskStim, index){
    let task = cuedTaskSet[index];
    actionArr.push(responseMappings[taskMapping][getCategory(taskStim, task)]);
  })
  return actionArr;
}

function getCategory(number, task){
  if (task == "m") {
    if (number < 5) {
      return "smaller";
    } else {
      return "larger";
    }
  } else {
    if (number%2 == 0) {
      return "even";
    } else {
      return "odd";
    }
  }
}

// ------------- Misc Functions ------------- //
// Fisher-Yates shuffle
function shuffle(array){
  for(let j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
}

// isEven Function for stimulus categorization
function isEven(n) {return n % 2 == 0;}
// let isEven = (n) => n % 2 == 0;

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

// function createPracticeCongruenciesArr(nTrials){
//   // calc how mnay congruent/incongruent trials are needed
//   let nConTrials = Math.ceil(nTrials * 0.5);
//   let nIncTrials = nTrials - nConTrials;

//   // array of congruent and incongruent trials
//   let congruenciesArr = new Array(nConTrials).fill("c").concat(new Array(nIncTrials).fill("i"));

//   // return shuffled array
//   return shuffle(congruenciesArr);
// }

// function createPracTaskArray(nTrials, task){
//   if (task == "") {
//     let taskA = "m", taskB = "p";

//     // calc how many switch and repeat trials needed
//     let nSwitchTrials = Math.ceil(nTrials * 0.5);
//     let nRepeatTrials = nTrials - nSwitchTrials;

//     // choose which task is first
//     let task1 = (Math.random() > 0.5) ? taskA : taskB;
//     let task2 = (task1 == taskA) ? taskB : taskA;

//     //build array with switch trial pairs ("A", "B") x ###
//     let switchArr = [];
//     for (let i = 0; i < Math.ceil((nTrials * 0.5) / 2); i++) {
//       switchArr.push(task1);
//       switchArr.push(task2);
//     }

//     // get number of switches
//     nSwitches = switchArr.length;

//     //function to get all indices of a certain value(val) in an array (arr)
//     function getAllIndexes(arr, val) {
//       var indexes = [];
//       for (let i = 0; i < arr.length; i++) {
//         if (arr[i] === val) {indexes.push(i);}
//       }
//       return indexes;
//     }

//     // insert repeat trials into switchArr
//     for (let i = 0; i < Math.ceil((nTrials - nSwitches) / 2); i++) {
//       // insert an A task
//       let a_indexes = getAllIndexes(switchArr,taskA);
//       let repeatloc_a = a_indexes[Math.floor(Math.random()*a_indexes.length)];
//       switchArr.splice(repeatloc_a, 0, taskA);

//       // insert task B
//       let b_indexes = getAllIndexes(switchArr,taskB);
//       let repeatloc_b = b_indexes[Math.floor(Math.random()*b_indexes.length)];
//       switchArr.splice(repeatloc_b, 0, taskB);
//     }

//     return switchArr;
//   } else {
//     return new Array(nTrials).fill(task);
//   }
// }

// practice task arrays
// vvvvvvvvvvvvvvvv
// function createPracticeStimPairs(nTrials, task){
//   let taskArr;
//   let congruenciesArr = createCongruencyArray(nTrials, 0.5);
//   if (task == "") {
//     taskArr = createTaskArray(nTrials, 0.5);
//   } else {
//     taskArr = Array(nTrials).fill(task);
//   }
//   // taskArr = createPracTaskArray(nTrials, task);
//   let targetArr = createTargetsArray(nTrials, congruenciesArr);
//   return stimTaskPairArr = targetArr.map((s, i) => [s, taskArr[i]]);
// }

// main task arrays
// vvvvvvvvvvvvvvvv
// creates what stimuli and task are on each trial
// function createStimuliAndTaskSets(nTrials, blockLetter){
//   let targetsArr, congruenciesArr, taskArr;
//   let blockParams = getBlockParameters(blockLetter);

//   // create arrays for target and task based on congruencies
//   congruenciesArr = createCongruencyArray(nTrials, blockParams.incProp);
//   taskArr = createTaskArray(nTrials, blockParams.switchProp);
//   targetsArr = createTargetsArray(nTrials, congruenciesArr);
//   cueArr = createCueArray(nTrials, blockParams.cueCoh);

//   // return zipped task and stim arr into one variable
//   return stimTaskPairArr = targetsArr.map((s, i) => [s, taskArr[i], cueArr[i]]);
// }
// // extracts just stimulus from stim/task array
// function getStimSet(arr){
//   let newArr = []
//   for (let i = 0; i < arr.length; i++) {
//    newArr = newArr.concat(arr[i][0]); //0 b/c stim are 1st in stimTaskPair arr
//   }
//   return newArr;
// }

// // extracts just task from stim/task array
// function getTaskSet(arr){
//   let newArr = []
//   for (let i = 0; i < arr.length; i++) {
//    newArr = newArr.concat(arr[i][1]); //1 b/c task is 2nd in stimTaskPair arr
//   }
//   return newArr;
// }

// function createCongruencyArray(batchSize, incProp){
//   // calc how mnay congruent/incongruent trials are needed
  
//   let congruenciesArr = [];
//   let i = 0;
//   while (i < batchSize) {
//     i++;
//     thisTrial = Math.random() < incProp ? "i" : "c";
//     congruenciesArr.push(thisTrial);
//   }

//   return congruenciesArr;
// }

// determine if trial is switch or repeat (first trials in blocks are "n")
// function getSwitchRepeatList(taskArr){
//   let switchRepeatArr = [], prevTask;
//   for (let i = 0; i < taskArr.length; i++){
//     // check if task switch/repeat and increment
//     if ((i % trialsPerBlock != 0) && (i % miniBlockLength != 0)) {
//       //if not first trial of block
//       if (taskArr[i] == prevTask) { //trial is repeat
//         switchRepeatArr.push("r");
//       } else { //trial is switch
//         switchRepeatArr.push("s");
//       }
//     } else {
//       //first trial so not switch or repeat, classify as "n"
//       switchRepeatArr.push("n");
//     }

//     //prepare prevTask for next loop iteration
//     prevTask = taskArr[i];
//   }
//   return switchRepeatArr;
// }


// function getCongruency(num){
//   if ([2,4,7,9].indexOf(num) != -1) {
//     if (taskMapping == 1 || taskMapping == 4) {
//       return "c";
//     } else {
//       return "i";
//     }
//   } else {
//     if (taskMapping == 1 || taskMapping == 4) {
//       return "i";
//     } else {
//       return "c";
//     }
//   }
// }
