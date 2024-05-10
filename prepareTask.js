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

// creates task array
function createTaskArray(switchSet){
  let nTrials = switchSet.length;
  let taskA = "taskA", taskB = "taskB";
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

// creates array of stimulus indecies (vis-a-vis stimSet and respMap)
function createTargetsArray(conArr){
  let targetsArr = [];
  conArr.forEach(conStatus => {
    targetsArr.push((conStatus == "c") ? _.sample(conIndex) : _.sample(incIndex));
  })

  return targetsArr;
}

// creates array of correct responses
function createActionArray(){
  // for each stimulus and associated task, identify required action for correct response
  let actionArr = [];
  taskStimuliSet.forEach(function(stimIndex, index){
    let task = cuedTaskSet[index];
    actionArr.push(respMap[task][stimIndex]);
  })
  return actionArr;
}

// ------------- Misc Functions ------------- //
// Fisher-Yates shuffle
function shuffle(array){
  for(let j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
}

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}
