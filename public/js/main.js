//https://javascript.info/strict-mode
"use strict";

// for testing
let testMode = true;
let speed = "normal"; //fast, normal
// speed = (testMode == true) ? "fast" : speed; //testMode defaults to "fast"
let skipPractice = false; // turn practice blocks on or off
let openerNeeded = false; //true

// ----- Block Paramenters (CHANGE ME) ----- //
let cueDiffByBlock = {A: 0.55, B: 0.6, C: 0.65, D: 0.7, E: 0.75, F: 0.8, G: 0.9, H:1.0};
let switchPropByBlock = 0.5;
let incPropByBlock = 0.5;

let blockNames = Object.keys(cueDiffByBlock);
let numBlockReps = 1, trialsPerBlock = 30;
let numBlocks = blockNames.length * numBlockReps;
let blockOrder = getBlockOrder(blockNames, numBlockReps); //1st arg is array of block names

// ----- Cue Paramenters (CHANGE ME) ----- //

let colorValues = {red: "#ff3503", blue: "#0381ff"};
let cueType = "circle"; // {rect, circle, squircle}
let stimType = "sandwich"
let cueOpts = {lineWidth: 10, numSegments: 10, radius: 125};
let stimOpts = {fontSize: 75, gapProp: 0.4}
stimOpts.gap = stimOpts.fontSize * stimOpts.gapProp;
let taskMap;
// ----- Stimulus Paramenters (CHANGE ME) ----- //

var respL = 'z', respR = 'm';

if (stimType === "flanker") {
  //Flanker task:
  //Task A: Middle up/down
  //Task B: Flanking up/down
  //2191: Up; 2193: Down
  var taskName = {taskA: "inner", taskB: "outer"}
  var stimElem = ["\u2191", "\u2193"];
  
  // [Center, Flanker]
  var stimSet = {
    UUUU: [stimElem[0], stimElem[0]], 
    DUUD: [stimElem[0], stimElem[1]], 
    UDDU: [stimElem[1], stimElem[0]],
    DDDD: [stimElem[1], stimElem[1]]
  };
  
  // ----- Task Paramenters (CHANGE ME) ----- //
  taskMap = randIntFromInterval(1,2);
  var respUp = (taskMap == 1) ? respL : respR;
  var respDown = (taskMap == 1) ? respR : respL;
  
  //Set up target-resp mappings
  //Each respMap element must have same length as stimSet
  var respMap = {
    taskA : {UUUU: respUp, DUUD: respUp, UDDU: respDown, DDDD: respDown},
    taskB : {UUUU: respUp, DUUD: respDown, UDDU: respUp, DDDD: respDown}
  };
  
} else if (stimType === "sandwich") {
  //Sandwich task:
  //Task A: Middle L/R
  //Task B: Flanking L/R
  //2190: Left; 2192: Right
  var taskName = {taskA: "inner", taskB: "outer"}
  var stimElem = ["\u2190", "\u2192"];
  
  // [Center, Flanker]
  var stimSet = {
    LLLL: [stimElem[0], stimElem[0]], 
    RLLR: [stimElem[0], stimElem[1]], 
    LRRL: [stimElem[1], stimElem[0]],
    RRRR: [stimElem[1], stimElem[1]]
  };
  
  // ----- Task Paramenters (CHANGE ME) ----- //  
  //Set up target-resp mappings
  //Each respMap element must have same length as stimSet
  var respMap = {
    taskA : {LLLL: respL, RLLR: respL, LRRL: respR, RRRR: respR},
    taskB : {LLLL: respL, RLLR: respR, LRRL: respL, RRRR: respR}
  };
} 
//construct arrays of congruent/incongruent stimuli from response match/mismatch
let conStim = [], incStim = [];
for (var stim in stimSet) respMap.taskA[stim] == respMap.taskB[stim] ? conStim.push(stim) : incStim.push(stim);

var pracOrder = shuffle(["taskA", "taskB"]);

// ----- Structural Paramenters (CHANGE ME) ----- //
let stimInterval = (speed == "fast") ? 10 : 1500; //2000 stimulus interval
let fixInterval = (speed == "fast") ? 10 : 500; //500 ms intertrial interval
let itiMin = (speed == "fast") ? 20 : 1000; //1200
let itiMax = (speed == "fast") ? 20 : 1200; //1400

let earlyCueInterval = 0; //100; early cue (relative to target presentation), 0 makes cue concurrant with target presentation. only valid with rectangle cue
let numPracticeTrials = 8;
let numPracticeReps =  Math.ceil(numPracticeTrials / Object.keys(stimSet).length);
let miniBlockLength = 0; //doesn't need to be multiple of 24. 0 to turn off
let practiceAccCutoff = (testMode == true) ? 0 : 85; // 75 acc%
let taskAccCutoff = (testMode == true) ? 0 : 85; // 75 acc%

function ITIInterval(){
  let itiStep = 50; //step size
  // random number between itiMin and Max by step size
  return itiMin + (Math.floor( Math.random() * ( Math.floor( (itiMax - itiMin) / itiStep ) + 1 ) ) * itiStep);
}

//initialize global task variables
let stimArr, taskArr, respArr, switchArr, incArr, cueArr; // global vars for task arrays
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
let colorMapping = randIntFromInterval(1,2);
let colorA = (colorMapping == 1) ? "red" : "blue";
let colorB = (colorMapping == 1) ? "blue" : "red";
let taskColor = {taskA: colorA, taskB: colorB};

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
      acc = respArr[trialCount] == event.key;
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
function randIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
