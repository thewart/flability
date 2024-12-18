//https://javascript.info/strict-mode
"use strict";

// for testing
let testMode = true;
let speed = "normal"; //fast, normal
// speed = (testMode == true) ? "fast" : speed; //testMode defaults to "fast"
let skipPractice = true; // turn practice blocks on or off
let openerNeeded = true; //true
let fixedColor = true;
let fixedTaskMap = true;

// ----- Block Paramenters (CHANGE ME) ----- //
let cueDiffByBlock = {A: 0.55, C: 0.65, D: 0.75, E: 0.85};
let stimDiffByBlock = 9/9;
let switchPropByBlock = 0.5;
let incPropByBlock = 0.5;

let blockNames = Object.keys(cueDiffByBlock);
let numBlockReps = 1, trialsPerBlock = 50;
let numBlocks = blockNames.length * numBlockReps;
let blockOrder = getBlockOrder(blockNames, numBlockReps); //1st arg is array of block names

// ----- Cue Paramenters (CHANGE ME) ----- //

let colorValues = {red: "#ff3503", blue: "#0381ff"};
let cueType = "circle"; // {rect, circle, squircle}
let stimType = "cvt";
let cueOpts = {lineWidth: 10, numSegments: 10, radius: 125};
// stimOpts.gap = stimOpts.fontSize * stimOpts.gapProp;
let taskMap;
// ----- Stimulus Paramenters (CHANGE ME) ----- //
let respL = 'z', respR = 'm';
let pracOrder = shuffle(["taskA", "taskB"]);

// ----- Structural Paramenters (CHANGE ME) ----- //
let stimInterval = (speed == "fast") ? 10 : 3000; //2000 stimulus interval
let fixInterval = (speed == "fast") ? 10 : 500; //500 ms intertrial interval
let itiMin = (speed == "fast") ? 20 : 1000; //1200
let itiMax = (speed == "fast") ? 20 : 1200; //1400

let earlyCueInterval = 0; //100; early cue (relative to target presentation), 0 makes cue concurrant with target presentation. only valid with rectangle cue
let numPracticeTrials = 12;
let miniBlockLength = 0; //doesn't need to be multiple of 24. 0 to turn off
let practiceAccCutoff = (testMode == true) ? 0 : 80; // 75 acc%
let taskAccCutoff = (testMode == true) ? 0 : 80; // 75 acc%

function ITIInterval(){
  let itiStep = 50; //step size
  // random number between itiMin and Max by step size
  return itiMin + (Math.floor( Math.random() * ( Math.floor( (itiMax - itiMin) / itiStep ) + 1 ) ) * itiStep);
}

//initialize global task variables
let stimArr, taskArr, respArr, switchArr, incArr, cueArr, stimDiff; // global vars for task arrays
let canvas, ctx, instrCanvas, itx; // global canvas variable
let expStage = (skipPractice == true) ? "main1" : "prac1-1";
// vars for tasks (iterator, accuracy) and reaction times:
let trialCount, blockTrialCount, acc, accCount, stimOnset, respOnset, respTime, block = 1, partResp, runStart, blockType = NaN;
let stimTimeout, breakOn = false, repeatNecessary = false, data=[];
let sectionStart, sectionEnd, sectionType, sectionTimer;
let expType = 0; // see below
/*  expType explanations:
0: No key press expected/needed
1: Key press expected (triggered by stimScreen() func that presents stimuli)
2: Key press from 1 received. Awaiting keyup event, which resets to 0 and calls itiScreen() function immediately.
3: Parcticipant still holding keypress from 1 during ITI. Awaitng keyup event, which resets to 0 but doesn't call itiScreen() function.
4: Participant still holding keypress from 1 at start of next Trial. Call promptLetGo() func to get participant to let go. After keyup resume experiment and reset to 0.
5: Key press from 0 still being held down. On keyup, reset to 0.
6: Key press from 0 still being held down when stimScreen() func is called. Call promptLetGo() func. After keyup resume and reset to 0.
7: mini block screen/feedback. Awaiting key press to continue, keyup resets to 0 and goes to next trial.
8: instruction start task "press to continue"
9: proceed to next instruction "press to continue"
10: Screen Size too small, "press any button to continue"
*/

// color-task mapping
// case 1: taskA = Red, taskB = Blue
// case 2: taskA = Blue, taskB = Red
let colorMapping = fixedColor ? 1 : randIntFromInterval(1,2);
let colorA = (colorMapping == 1) ? "red" : "blue";
let colorB = (colorMapping == 1) ? "blue" : "red";
let taskColor = {taskA: colorA, taskB: colorB};

let gridSize = 120;
let dimLen = 3;
let stimOpts = {nRow: dimLen, nCol: dimLen, gridSize: gridSize, element: {}}

if (stimType === "orientedBars") {
  
  stimOpts.element = {long: gridSize/dimLen * 0.8, short: gridSize/dimLen * 0.4, fillStyle: "black", lineWidth: 2};
  
  var drawElement = function (element, x, y, opts) {
    ctx.beginPath();
    ctx.lineWidth = opts.lineWidth;
    ctx.strokeStyle = 'black';
    
    switch (element.at(0)) {
      case 'V':
      ctx.rect(x-opts.short/2, y-opts.long/2, opts.short, opts.long);
      break;
      
      case 'H':
      ctx.rect(x-opts.long/2, y-opts.short/2, opts.long, opts.short); 
      break;
    }
    
    switch (element.at(1)) {
      case 'F':
      ctx.fillStyle = opts.fillStyle;
      ctx.fill();
      break;
      
      case 'E':
      ctx.stroke();
      break;
    }
  }
  
  var stimSet = ['VF', 'VE', 'HF', 'HE'];
  
  // var aMap = randIntFromInterval(1,2);
  // var bMap = randIntFromInterval(1,2);
  let aMap = 1;
  let bMap = 1;
  
  var singleTaskMap = {
    taskA: {
      H: (aMap == 1) ? respL : respR,
      V: (aMap == 1) ? respR : respL
    },
    taskB: {
      F: (bMap == 1) ? respL : respR,
      E: (bMap == 1) ? respR : respL
    }
  };
  
  var taskName = {taskA: 'orientation', taskB: 'fill'};
  
} else if (stimType === "cvt") {
  
  let cellArea = (gridSize * gridSize) / (dimLen * dimLen);
  stimOpts.element = {area: cellArea*0.2, fillStyle: "black", lineWidth: 2};
  
  var drawElement = function (element, x, y, opts) {
    ctx.beginPath();
    
    switch (element.at(0)) {
      case 'C':
      drawCircle(x, y, opts.area, false, false);
      break;
      
      case 'T':
      drawTriangle(x, y, opts.area, false, false); 
      break;
    }
    
    switch (element.at(1)) {
      case 'F':
      ctx.fillStyle = opts.fillStyle;
      ctx.fill();
      break;
      
      case 'E':
      ctx.lineWidth = opts.lineWidth;
      ctx.strokeStyle = 'black';    
      ctx.stroke();
      break;
    }
  }
  
  var drawStimulus = function(stim, stimOpts) {
    let propB = stimDiff[block-1];
    let propA = propB;
    let elemVec = randElemVec(stim, propA, propB);
    drawElementGrid(elemVec, stimOpts);
  }

  var stimSet = ['CF', 'CE', 'TF', 'TE'];
  
  let aMap = fixedTaskMap ? 1 : randIntFromInterval(1,2);
  let bMap = fixedTaskMap ? 1 : randIntFromInterval(1,2);
  
  var singleTaskMap = {
    taskA: {
      C: (aMap == 1) ? respL : respR,
      T: (aMap == 1) ? respR : respL
    },
    taskB: {
      F: (bMap == 1) ? respL : respR,
      E: (bMap == 1) ? respR : respL
    }
  };
  
  var taskName = {taskA: 'type', taskB: 'fill'};
  var elemNames = {taskA: {C: 'circles', T: 'triangles'}, taskB: {F: 'filled', E: 'empty'}};

} else if (stimType=="magpar") {

  var drawStimulus = function(stim, stimOpts) {
    drawCharacter(stim, ctx.canvas.width/2, ctx.canvas.height/2, stimOpts.fontSize)
  }
  
  var stimSet = [1, 2, 3, 4, 6, 7, 8, 9];

  let aMap = fixedTaskMap ? 1 : randIntFromInterval(1,2);
  let bMap = fixedTaskMap ? 1 : randIntFromInterval(1,2);

  var singleTaskMap = {taskA: {}, taskB: {}};
  stimSet.forEach(s => {
    if (isEven(s)) {
      singleTaskMap.taskA[s] = (aMap == 1) ? respL : respR;
    } else if (isOdd(s)) {
      singleTaskMap.taskA[s] = (aMap == 1) ? respR : respL;
    } 

    if (s > 5) {
      singleTaskMap.taskB[s] = (bMap == 1) ? respL : respR;
    } else if (s < 5) {
      singleTaskMap.taskB[s] = (bMap == 1) ? respR : respL;
    }
  })

  var taskName = {taskA: 'parity', taskB: 'magnitude'};
  //var elemNames = {taskA: {C: 'circles', T: 'triangles'}, taskB: {F: 'filled', E: 'empty'}};
}

let respMap = makeRespMap(stimSet, singleTaskMap);

//construct arrays of congruent/incongruent stimuli from response match/mismatch
let conStim = [], incStim = [];
stimSet.forEach(s => respMap.taskA[s] == respMap.taskB[s] ? conStim.push(s) : incStim.push(s));

// ------ EXPERIMENT STARTS HERE ------ //
$(document).ready(function(){
  // prepare task canvas
  instrCanvas = document.getElementById('instruction-canvas');
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
  ctx.font = "bold 60px Arial";
  ctx.textBaseline= "middle";
  ctx.textAlign="center";
  
  // create key press listener
  $("body").keypress(function(event){
    if (expType == 0) {
      expType = 5; //keydown when not needed. Keyup will reset to 0.
    } else if (expType == 1){
      expType = 2; //prevent additional responses during this trial (i.e. holding down key)
      partResp = event.key;
      acc = respArr[trialCount] == event.key.toLowerCase();
      // if (acc == 1){accCount++;}
      accCount += acc;
      respOnset = new Date().getTime() - runStart;
      respTime = respOnset - stimOnset;
    }
  })
  
  // create key release listener
  $("body").keyup( function(event) {
    if (expType == 2){
      expType = 0;
      clearTimeout(stimTimeout);
      itiScreen();
    } else if (expType == 3 || expType == 5) {
      expType = 0;
    } else if (expType == 4 || expType == 6 || expType == 10) {
      expType = 0;
      countDown(3);
    } else if (expType == 7) {
      clearInterval(sectionTimer);
      
      // 7: block feedback - press button to start next block
      // logData(data, 'feedback');      
      // increment block information before beginning next block
      block++; blockIndexer++;
      blockTrialCount = 0;
      blockType = blockOrder[blockIndexer];
      
      countDown(3);
    } else if (expType == 8) { // 8: "press button to start task"
      // logData(data, expStage);
      // reset expStage and start task
      expType = 0;
      runTasks();
      
    } else if (expType == 9) { // 9: "press button to start next section"
      // logData(data, expStage);
      // reset expStage and proceed to next section
      expType = 0;
      navigateInstructionPath(repeatNecessary);
      
    } else if (expType == 11) { // repeat instructions
      // logData(data, expStage);
      // iterate block and go back to instructions
      expType = 0;
      if (repeatNecessary) {
        block++;
      } else {
        block = 1;
      }
      
      navigateInstructionPath(repeatNecessary);
    }
  })
  
  // see if menu.html is still open
  if (openerNeeded == true && opener == null) {
    promptMenuClosed();
  } else {
    // start experiment
    runStart = new Date().getTime();
    runInstructions();
  }
});

// ------- Misc Experiment Functions ------- //

function promptMenuClosed(){
  $('.MenuClosedPrompt').show();
}

function logData(data, stage) {
  sectionEnd = new Date().getTime() - runStart;
  data.push([stage, sectionType, block, blockType, 
    NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
    sectionStart, sectionEnd, sectionEnd - sectionStart]
  );
  console.log(data);
}
