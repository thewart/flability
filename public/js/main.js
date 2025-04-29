//https://javascript.info/strict-mode
"use strict";

// for testing
let testMode = false;
let speed = "normal"; //fast, normal
// speed = (testMode == true) ? "fast" : speed; //testMode defaults to "fast"
let skipPractice = false; // turn practice blocks on or off
let openerNeeded = true; //true
let fixedColor = false;
let fixedTaskMap = false;

// ----- Block Paramenters (CHANGE ME) ----- //
let cueDiffByBlock = {A: 0.55, B: 0.65, C: 0.75, D: 0.85};
let stimDiffByBlock = 9/9;
let switchPropByBlock = 0.5;
let incPropByBlock = 0.5;

let blockNames = Object.keys(cueDiffByBlock);
let numBlockReps = 2, trialsPerBlock = 60;
let numBlocks = blockNames.length * numBlockReps;
let blockOrder = duplicateAndShuffle(blockNames, numBlockReps); //1st arg is array of block names

// ----- Cue Paramenters (CHANGE ME) ----- //

let colorValues = {red: "#D92E2E", blue: "#2E52D9", green: "#36B336",
   yellow: "#D9D12E", black: "#191919", white: "#fcfcfc"};
let cueType = "circle"; // {rect, circle, squircle}
let stimType = "stroop";
let cueOpts = {lineWidth: 10, numSegments: 10, radius: 125};

let taskMap;
// ----- Stimulus Paramenters (CHANGE ME) ----- //
let respLL = 'z', respL = 'x', respR = ',', respRR = '.';
let respSet = [respLL, respL, respR, respRR];
let pracOrder = shuffle(["taskA", "taskB"]);

// ----- Structural Paramenters (CHANGE ME) ----- //
let stimInterval = (speed == "fast") ? 10 : 4000; //2000 stimulus interval
let fixInterval = (speed == "fast") ? 10 : 500; //500 ms intertrial interval
let itiMin = (speed == "fast") ? 20 : 1000; //1200
let itiMax = (speed == "fast") ? 20 : 1200; //1400

let earlyCueInterval = 0; //100; early cue (relative to target presentation), 0 makes cue concurrant with target presentation. only valid with rectangle cue
let numPracticeTrials = 16;
let miniBlockLength = 0; //doesn't need to be multiple of 24. 0 to turn off
let practiceAccCutoff = (testMode == true) ? 0 : 75; // 75 acc%
let taskAccCutoff = (testMode == true) ? 0 : 65; // 65 acc%

function ITIInterval(){
  let itiStep = 50; //step size
  // random number between itiMin and Max by step size
  return itiMin + (Math.floor( Math.random() * ( Math.floor( (itiMax - itiMin) / itiStep ) + 1 ) ) * itiStep);
}

//initialize global task variables
let stimArr, taskArr, respArr, switchArr, incArr, cueArr, stimDiff; // global vars for task arrays
let canvas, ctx, instrCanvas, modalCanvas1, modalCanvas2; // global canvas variable
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
let colorA = (colorMapping == 1) ? "black" : "white";
let colorB = (colorMapping == 1) ? "white" : "black";
let taskColor = {taskA: colorA, taskB: colorB};

// let gridSize = 120;
// let dimLen = 3;
// let stimOpts = {nRow: dimLen, nCol: dimLen, gridSize: gridSize, element: {}}
let stimOpts = new Object();
if (stimType === "stroop") {
  stimOpts.fontSize = 75;

  var drawStimulus = function(stim, opts) {
    offsetX = (opts.offsetX === undefined) ? 0 : opts.offsetX;
    offsetY = (opts.offsetY === undefined) ? 0 : opts.offsetY;
    var centerX = ctx.canvas.width / 2 + offsetX;
    var centerY = ctx.canvas.height / 2 + offsetY; 
    var [word, color] = stim.split('/');
    console.log(stim, word, color)
    drawCharacter(word, centerX, centerY, opts.fontSize, color)
  }

  var createStimArray = createStimArrayNoBacksies;
  var wordSet = ["red", "blue", "yellow", "green"];
  var stimSet = new Array();
  var singleTaskMap = {taskA: {}, taskB: {}};
  var respSetShuffled = shuffle(respSet);

  for (var i = 0; i < wordSet.length; i++) {
    singleTaskMap.taskA[wordSet[i]] = respSetShuffled[i];
    for (var j = 0; j < wordSet.length; j++) stimSet.push(wordSet[i] + '/' + wordSet[j]);
  }
  singleTaskMap.taskB = singleTaskMap.taskA;

  var respMap = makeRespMap(stimSet, singleTaskMap);
  var taskName = {taskA: "read the word", taskB: "identify the print color"};
  var elemNames = {
    taskA: {red: "word 'red'", blue: "word 'blue'", yellow: "word 'yellow'", green: "word 'green'"},
    taskB: {red: "color red", blue: "color blue", yellow: "color yellow", green: "color green"}
  }

  var pracRespMap = {taskA: {}, taskB: {}}
  wordSet.forEach(w => {
    pracRespMap.taskA[w + '/black'] = singleTaskMap.taskA[w];
    pracRespMap.taskB['\u25A0/' + w] = singleTaskMap.taskB[w];
  });
  
} else if (stimType=="magpar") {

  var drawStimulus = function(stim, opts) {
    offsetX = (opts.offsetX === undefined) ? 0 : opts.offsetX;
    offsetY = (opts.offsetY === undefined) ? 0 : opts.offsetY;
    var centerX = ctx.canvas.width / 2 + offsetX;
    var centerY = ctx.canvas.height / 2 + offsetY; 
  
    drawCharacter(stim, centerX, centerY, opts.fontSize)
  }
  //either createStimArrayRand to allow repeats, or createStimArrayNoBacksies to ensure no stim repeats
  var createStimArray = createStimArrayNoBacksies;

  stimOpts.fontSize = 100;
  var stimSet = ['1', '2', '3', '4', '6', '7', '8', '9'];

  let aMap = fixedTaskMap ? 1 : randIntFromInterval(1,2);
  let bMap = fixedTaskMap ? 1 : randIntFromInterval(1,2);

  var singleTaskMap = {
    taskA: {
      even: (aMap == 1) ? respL : respR,
      odd: (aMap == 1) ? respR : respL
    }, taskB: {
      'greater than 5': (bMap == 1) ? respL : respR,
      'less than 5': (bMap == 1) ? respR : respL
    }
  };

  var respMap = {taskA: {}, taskB: {}};
  stimSet.forEach(ss => {
    let s = Number(ss);
    if (isEven(s)) {
      respMap.taskA[ss] = singleTaskMap.taskA.even;
    } else if (isOdd(s)) {
      respMap.taskA[ss] = singleTaskMap.taskA.odd;
    } 
    if (s > 5) {
      respMap.taskB[ss] = singleTaskMap.taskB['greater than 5'];
    } else if (s < 5) {
      respMap.taskB[ss] = singleTaskMap.taskB['less than 5'];
    }
  })

  var taskName = {taskA: 'even or odd', taskB: 'greater or less than 5'};
  //var elemNames = {taskA: {C: 'circles', T: 'triangles'}, taskB: {F: 'filled', E: 'empty'}};
}

//construct arrays of congruent/incongruent stimuli from response match/mismatch
let conStim = [], incStim = [];
stimSet.forEach(s => respMap.taskA[s] == respMap.taskB[s] ? conStim.push(s) : incStim.push(s));

// ------ EXPERIMENT STARTS HERE ------ //
$(document).ready(function(){
  setUpModal();
  // prepare task canvas
  instrCanvas = document.getElementById('instruction-canvas');
  canvas = document.getElementById('myCanvas');
  modalCanvas1 = document.getElementById('modal-canvas-1');
  modalCanvas2 = document.getElementById('modal-canvas-2');
  drawModal();

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
      // respOnset = new Date().getTime() - runStart;
      respOnset[trialCount] = performance.now();
      respTime = respOnset[trialCount] - stimOnset[trialCount];
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
      $("#modal-container").hide();
      $("#myModal").hide();
      expType = 0;
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
    // runStart = new Date().getTime();
    runStart = performance.now();
    runInstructions();
  }
});

// ------- Misc Experiment Functions ------- //

function promptMenuClosed(){
  $('.MenuClosedPrompt').show();
}

// function logData(data, stage) {
//   sectionEnd = new Date().getTime() - runStart;
//   data.push([stage, sectionType, block, blockType, 
//     NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
//     sectionStart, sectionEnd, sectionEnd - sectionStart]
//   );
//   console.log(data);
// }
