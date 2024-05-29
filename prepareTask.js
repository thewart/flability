function createPracticeArrays(nTrials, task){
  // let stimPairs = createPracticeStimPairs(nTrials, task);
  incArr = createBinaryArray(nTrials, 0.5, ["i", "c"]);
  stimArr = createStimArray(incArr, conStim, incStim);
  if (task == "") {
    switchArr = createBinaryArray(nTrials-1, 0.5, ["s", "r"])
    switchArr.unshift(null);
    taskArr = createTaskArray(switchArr);
  } else {
    taskArr = Array(nTrials).fill(task);
  }
  respArr = createRespArray(stimArr, taskArr, respMap);
  cueArr = createCueArray(nTrials, 1.0);
}

function createArrays(blockOrder, trialsPerBlock){
  let blockParams;
  
  // write over practice block
  stimArr = []; taskArr = []; switchArr = []; incArr = [], cueArr = [];

  blockOrder.forEach( blockLetter => {
    blockParams = getBlockParameters(blockLetter);
    // create arrays for target and task based on congruencies
    let incBlock = createBinaryArray(trialsPerBlock, blockParams.incProp, ["i", "c"]);
    let switchBlock = createBinaryArray(trialsPerBlock-1, blockParams.switchProp, ["s", "r"]);
    switchBlock.unshift(null);

    taskArr = taskArr.concat(createTaskArray(switchBlock));
    cueArr = cueArr.concat(createCueArray(trialsPerBlock, blockParams.cueDiff));
    switchArr = switchArr.concat(switchBlock);
    incArr = incArr.concat(incBlock);
  });

  stimArr = createStimArray(incArr, conStim, incStim);
  respArr = createRespArray(stimArr, taskArr, respMap);
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
function createTaskArray(switchArr){
  let nTrials = switchArr.length;
  let taskA = "taskA", taskB = "taskB"; // in case we want to use more informative task names
  let taskArr = [];
  let thisTask, prevTask;

  prevTask = Math.random() > 0.5 ? taskA : taskB;
  taskArr.push(prevTask);
  let i = 1;
  while (i < nTrials) {
    isSwitch = switchArr[i];
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

function createCueArray(nTrials, cueDiff) {
  return Array(nTrials).fill(cueDiff);
}

// creates array of stimulus indecies (vis-a-vis stimArr and respMap)
function createStimArray(incArr, conStim, incStim){
  let targetsArr = [];
  incArr.forEach(conStatus => {
    targetsArr.push((conStatus == "c") ? _.sample(conStim) : _.sample(incStim));
  })

  return targetsArr;
}

// creates array of correct responses
function createRespArray(stimArr, taskArr, respMap){
  // for each stimulus and associated task, identify required action for correct response
  let respArr = [];
  stimArr.forEach((stim, index) => {
    let task = taskArr[index];
    respArr.push(respMap[task][stim]);
  });
  return respArr;
}
