function createPracticeArrays(nReps, task, cueDiff){
  var nTrials = Object.keys(stimSet).length * nReps;

  stimArr = shuffle(repeat(Object.keys(stimSet), nReps));
  incArr = [];
  for (var s in stimArr) incArr.push(conStim.includes(s) ? 'c' : 'i'); 

  if (task == "") {
    switchArr = createBinaryArray(nTrials, 0.5, ['s', 'r'])
    switchArr[0] = null;
    taskArr = createTaskArray(switchArr);
  } else {
    switchArr = Array(nTrials).fill('r');
    switchArr[0] = null;
    taskArr = Array(nTrials).fill(task);
  }
  respArr = createRespFromStim(stimArr, taskArr, respMap);
  cueArr = createCueArray(cueDiff, taskArr);
}

function createArrays(blockOrder, trialsPerBlock){
  let blockParams;
  // write over practice block
  stimArr = []; taskArr = []; switchArr = []; incArr = [], cueArr = []; respArr = [];

  blockOrder.forEach( blockLetter => {
    blockParams = getBlockParameters(blockLetter);
    // create arrays for target and task based on congruencies
    let incBlock = createBinaryArray(trialsPerBlock, blockParams.incProp, ['i', 'c']);
    let switchBlock = createBinaryArray(trialsPerBlock, blockParams.switchProp, ['s', 'r']);
    switchBlock[0] = null;
    let taskBlock = createTaskArray(switchBlock);
    // let respBlock = createBinaryArray(trialsPerBlock, 0.5, labels=[respL, respR]);

    taskArr = taskArr.concat(taskBlock);
    cueArr = cueArr.concat(createCueArray(blockParams.cueDiff, taskBlock));
    switchArr = switchArr.concat(switchBlock);
    incArr = incArr.concat(incBlock);
    // respArr = respArr.concat(respBlock);
  });

  stimArr = createStimArray(incArr);
  respArr = createRespFromStim(stimArr, taskArr, respMap);
}

function createBinaryArray(batchSize, prop, labels){
  //fixed proportions, randomized orders
  let prop0 = Math.ceil(batchSize * prop);
  let prop1 = Math.floor(batchSize * (1-prop));
  let arr = Array(prop0).fill(labels[0]).concat(Array(prop1).fill(labels[1]));

  return shuffle(arr);
}


// creates task array
function createTaskArray(switchArr){
  let nTrials = switchArr.length;
  let taskA = 'taskA', taskB = 'taskB'; // in case we want to use more informative task names
  let taskArr = [];
  let thisTask, prevTask;

  prevTask = Math.random() > 0.5 ? taskA : taskB;
  taskArr.push(prevTask);
  let i = 1;
  while (i < nTrials) {
    if (switchArr[i] === 's') {
      thisTask = (prevTask===taskA) ? taskB : taskA;
    } else {
      thisTask = prevTask;
    }

    taskArr.push(thisTask);
    prevTask = thisTask;
    
    i++;
  }
  
  return taskArr;
}

function createCueArray(cueDiff, taskArr) {
  let cueArr = [];
  taskArr.forEach(task => 
    cueArr.push(taskColor[task] == "red" ? cueDiff : 1-cueDiff)
  );
  
  return cueArr;
}

function createStimArray(incArr){
  let targetsArr = [];
  incArr.forEach(conStatus => 
    targetsArr.push((conStatus == "c") ? _.sample(conStim) : _.sample(incStim))
  );

  return targetsArr;
}

//untested!
function createStimFromResp(incArr, taskArr, respArr){
  let targetsArr = [];
  
  incArr.forEach( (conStatus, index) => {
    let stimByCon = (conStatus == 'c') ? conStim : incStim;
    let thisMap = respMap[taskArr[index]];
    let stimByResp = getAllKeysByValue(thisMap, respArr[index]);
    let stimChoices = stimByCon.filter(s => stimByResp.includes(s));
    
    targetsArr.push(_.sample(stimChoices));
  })

  return targetsArr;
}

// creates array of correct responses; unused
function createRespFromStim(stimArr, taskArr, respMap){
  // for each stimulus and associated task, identify required action for correct response
  let respArr = [];
  stimArr.forEach((stim, index) => {
    let task = taskArr[index];
    respArr.push(respMap[task][stim]);
  });
  return respArr;
}

function makeRespMap(stimSet, respMapA, respMapB) {
  respMap = {taskA: {}, taskB: {}};
  sA = stimSet.map(s => {return s.at(0)});
  respMap.taskA = sA.map(s => {return respMapA[s]});
  sB = stimSet.map(s => {return s.at(1)});
  respMap.taskB = sB.map(s => {return respMapB[s]});
  return respMap;
}
