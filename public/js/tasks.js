// some tasks.js specific variables
let trialFunc;
let screenSizePromptCount = 0, numScreenSizeWarnings = 2;

// main task function
function runTasks(){
  //clear any instructions and show canvas
  hideInstructions();
  ctx = canvas.getContext('2d');
  canvas.style.display = "block";
  
  // clear any instruction button press listeners
  $(document).off("click","#nextInstrButton");
  $(document).off("click","#startExpButton");
  $(document).off("click","#nextSectionButton");
  
  //reset accuracy and block trial count
  accCount = 0; blockTrialCount = 0;
  
  // --- PRACTICE 1 --- //
  if (expStage.indexOf("prac1") != -1){
    
    runPractice(numPracticeReps, pracOrder[0]);
    
    // --- PRACTICE 2 --- //
  } else if (expStage.indexOf("prac2") != -1){
    
    runPractice(numPracticeReps, pracOrder[1]);
    
    // --- PRACTICE 3 --- //
  } else if (expStage.indexOf("prac3") != -1) {
    
    runPractice(numPracticeReps * 2, '', 0.75);
    
  } else if (expStage.indexOf("prac4") != -1) {
    
    runPractice(numPracticeReps * 2, 0.75);
    
    // --- MAIN TASK --- //
  } else if (expStage.indexOf("main") != -1) {
    
    // set blockType for first block of real task (see blockFeedback.js)
    blockIndexer = 0;
    blockType = blockOrder[blockIndexer];
    
    // reset
    trialCount = 0; block = 1;
    
    // create task arrays
    createArrays(blockOrder, trialsPerBlock);
    
    // start countdown into main task
    countDown(3);
  }
}

function runPractice(numPracticeReps, task = "", cueDiff=1.0){
  trialCount = 0;
  if (repeatNecessary != true){
    block = 1;
  }
  
  // create task array for practice block
  createPracticeArrays(numPracticeReps, task, cueDiff);
  
  // start countdown into practice block
  countDown(3);
}

function countDown(seconds){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "bold 60px Arial";
  if (seconds > 0){
    ctx.fillText(seconds,canvas.width/2,canvas.height/2)
    setTimeout(function(){countDown(seconds - 1)},1000);
  } else {
    trialFunc = (expStage.indexOf("main") != -1) ? runTrial : runPracticeTrial;
    trialFunc();
  }
}

function runPracticeTrial(){
  if (openerNeeded == false || opener != null) {
    sectionType = "pracTask";
    if (trialCount < stimArr.length){
      if (expType == 3){ //check if key is being held down
        expType = 4;
        promptLetGo();
      } else {
        // check if screen size is big enough
        if (screenSizeIsOk()){
          // start next trial cycle
          fixationScreen();
        } else {
          promptScreenSize();
        }
      }
    } else { //if practice block is over, go to feedback screen
      practiceAccuracyFeedback( Math.round( accCount / (blockTrialCount) * 100 ) );
    }
    
  } else {
    // if menu is closed, hide other elements and show menu closed prompt
    hideInstructions();
    canvas.style.display = "none";
    promptMenuClosed();
  }
}

function runTrial(){
  // make sure opener (menu.html) is still open
  if (openerNeeded == false || opener != null) {
    sectionType = "mainTask";
    if (trialCount < numBlocks * trialsPerBlock) { //if exp isn't over yet
      
      if (trialCount % trialsPerBlock == 0 && !breakOn && trialCount != 0) {
        //if arrived at big block break, update block information
        breakOn = true;
        bigBlockScreen();
        
      } else if (trialCount % miniBlockLength == 0 && !breakOn && trialCount != 0) {
        //if arrived at miniblock break
        breakOn = true; miniBlockScreen();
        
      } else {
        
        if (expType == 3 || expType == 5){ //if key is being held down still
          expType = 4;
          promptLetGo();
          
        } else {
          // check if screen size is big enough
          if (screenSizeIsOk()){
            // start next trial cycle
            breakOn = false;
            fixationScreen();
          } else {
            promptScreenSize();
          }
        }
      }
      
    } else {
      endOfExperiment();
    }
    
  } else {
    // if menu is closed, hide other elements and show menu closed prompt
    hideInstructions();
    canvas.style.display = "none";
    promptMenuClosed();
  }
}

function endOfExperiment(){
  // end of experiment stuff
  try {
    // upload data to menu.html's DOM element
    $("#RTs", opener.window.document).val(data.join("\n"));
    
    // call menu debriefing script
    opener.updateMainMenu(2);
    
    // close the experiment window
    JavaScript:window.close();
  } catch (e) {
    alert("Data upload failed. Did you close the previous window?");
  }
}

function fixationScreen(){
  // prepare canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 60px Arial";
  ctx.fillStyle = "black";
  
  // display fixation
  ctx.fillText("+",canvas.width/2,canvas.height/2);
  
  // determine which function is next
  let nextScreenFunc = (earlyCueInterval > 0) ? earlyTaskCue : stimScreen;
  
  // go to next after appropriate time
  setTimeout(nextScreenFunc, fixInterval);
}

function stimScreen(){
  if (expType == 5) {
    expType = 6;
    promptLetGo();
    
  } else {
    stimOnset = new Date().getTime() - runStart;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // set color, unless rectangular cue is needed.
    switch (cueType) {
      case "rect":
      drawRect(opts);
      break;
      case "circle":
      drawCircle(cueArr[trialCount], cueOpts);
      break;
    }
    
    //reset all response variables and await response (expType = 1)
    expType = 1; acc = NaN, respTime = NaN, partResp = NaN, respOnset = NaN;
    // display stimulus
    if (stimType === "flanker") {
      let middle = stimSet[stimArr[trialCount]][0];
      let flanker = stimSet[stimArr[trialCount]][1];
      drawFlanker(middle, flanker, stimOpts);
    } else if (stimType === "sandwich") {
      let middle = stimSet[stimArr[trialCount]][0];
      let flanker = stimSet[stimArr[trialCount]][1];
      drawSandwich(middle, flanker, stimOpts);
    }
    // proceed to ITI screen after timeout
    stimTimeout = setTimeout(itiScreen, stimInterval);
  }
}

function earlyTaskCue(){
  if (expType == 5) {
    expType = 6;
    promptLetGo();
    
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if preceded by early flanker
    drawRect(opts);
    // continue to stimulus after early cue delay
    stimTimeout = setTimeout(stimScreen,earlyCueInterval);
  }
}

function itiScreen(){
  if (expType == 1) { // participant didn't respond
    expType = 0;
  } else if (expType == 2) { //participant still holding down response key
    expType = 3;
  }
  
  // variable for readability below
  // let stim = stimArr[trialCount];
  
  // log data
  data.push([sectionType, block, blockType,
  trialCount + 1, blockTrialCount + 1, getAccuracy(acc), respTime, stimArr[trialCount], cueArr[trialCount],
  incArr[trialCount], taskName[taskArr[trialCount]], partResp, stimOnset, respOnset, respArr[trialCount]]);
  
  // prepare ITI canvas
  ctx.fillStyle = accFeedbackColor();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // display response feedback (correct/incorrect/too slow)
  ctx.font = "bold 60px Arial";
  ctx.fillText(accFeedback(),canvas.width/2,canvas.height/2);
  
  // trial finished. iterate trial counters
  trialCount++; blockTrialCount++;
  
  // proceed to next trial or to next section after delay
  setTimeout(trialFunc, ITIInterval());
}

function practiceAccuracyFeedback(accuracy){
  sectionStart = new Date().getTime() - runStart;
  sectionType = "pracFeedback";
  
  // prepare canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "25px Arial";
  expType = 11;
  
  // display feedback
  if (accuracy < practiceAccCutoff) { //if accuracy is too low
    repeatNecessary = true;
    
    // display feedback text
    ctx.fillText("You got " + accuracy + "% correct in this practice block.",canvas.width/2,canvas.height/2 - 50);
    ctx.fillText("Remember, you need to get >" + practiceAccCutoff + "%.",canvas.width/2,canvas.height/2);
    ctx.fillText("Press any button to go back ",canvas.width/2,canvas.height/2 + 80);
    ctx.fillText("to the instructions and try again.",canvas.width/2,canvas.height/2 + 110);
    
  } else { //otherwise proceed to next section
    
    // display feedback text
    ctx.fillText("You got " + accuracy + "% correct in this practice block.",canvas.width/2,canvas.height/2 - 50);
    ctx.fillText("Press any button to go on to the next section.",canvas.width/2,canvas.height/2 + 100);
    
    // prep key press/instruction logic
    repeatNecessary = false;
    
  }
}

function miniBlockScreen(){
  sectionType = "miniblock";
  sectionStart = new Date().getTime() - runStart;
  expType = 7;
  
  // prep canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "25px Arial";
  
  // display miniblock text
  ctx.fillText("You are "+ Math.round(((trialCount%trialsPerBlock)/trialsPerBlock)*100)+"% through this block.",canvas.width/2,canvas.height/2 - 50);
  ctx.fillText("Your overall accuracy so far is " + Math.round((accCount/trialCount)*100) + "%.",canvas.width/2,canvas.height/2);
  ctx.fillText("Press any button to continue.",canvas.width/2,canvas.height/2 + 100);
  ctx.font = "italic bold 22px Arial";
  ctx.fillText("Remember, you need >" + taskAccCutoff + "% accuracy.",canvas.width/2,canvas.height/2 + 50);
}

function bigBlockScreen(){
  let minutesBreak = 2;
  sectionType = "blockBreak";
  sectionStart = new Date().getTime() - runStart;
  expType = 0; //else expType stays = 1 till below runs
  setTimeout(function(){expType = 7},2000);
  
  // display break screen (With timer)
  drawBreakScreen("0" + minutesBreak,"00", minutesBreak);
  blockBreakFunction(minutesBreak,0,minutesBreak);
  
  function blockBreakFunction(minutes, seconds, max){
    let time = minutes*60 + seconds;
    ctx.fillStyle = "black";
    sectionTimer = setInterval(function(){
      if (time < 0) {return}
      ctx.fillStyle = (time <= 60) ? "red" : "black";
      let minutes = Math.floor(time / 60);
      if (minutes < 10) minutes = "0" + minutes;
      let seconds = Math.floor(time % 60);
      if (seconds < 10) seconds = "0" + seconds;
      drawBreakScreen(minutes, seconds, max);
      time--;
    }, 1000);
  }
}

function drawBreakScreen(minutes, seconds, max){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // draw timer (with color from previous function)
  ctx.font = "bold 45px Arial";
  ctx.fillText(minutes + ":" + seconds,canvas.width/2,canvas.height/2 - 100);
  
  // display miniblock text
  ctx.fillStyle = "black";
  ctx.font = "25px Arial";
  ctx.fillText("This is a short break. Please don't pause for more than " + max + " minutes.",canvas.width/2,canvas.height/2 - 150);
  if (numBlocks - block > 1) {
    ctx.fillText("You are finished with block " + block + ". You have " + (numBlocks - block) + " blocks left.",canvas.width/2,canvas.height/2);
  } else {
    ctx.fillText("You are finished with block " + block + ". You have " + (numBlocks - block) + " block left.",canvas.width/2,canvas.height/2);
  }
  ctx.fillText("Your overall accuracy so far is " + Math.round((accCount/trialCount)*100) + "%.",canvas.width/2,canvas.height/2+50);
  ctx.font = "bold 25px Arial";
  ctx.fillText("Press any button to continue.",canvas.width/2,canvas.height/2 + 200);
}

// functions for determining ITI feedback depending on accuracy
function accFeedback(){
  if (acc == 1){
    return "Correct";
  } else if (acc == 0) {
    return "Incorrect";
  } else {
    return "Too Slow";
  }
}

function accFeedbackColor(){
  if (acc == 1){
    return "green";
  } else if (acc == 0) {
    return "red";
  } else {
    return "black";
  }
}

function getAccuracy(accValue){
  //normalizes accuracy values into 0 or 1 (NaN becomes 0)
  return accValue == 1 ? 1 : 0;
}

// --- misc functions for edge cases (pressing and not letting go, caps lock, screensize) ---
function promptLetGo(){
  //prepare canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  
  // show warning
  ctx.fillText("Please release key",canvas.width/2,canvas.height/2);
  ctx.fillText("immediately after responding.",canvas.width/2,canvas.height/2 + 30);
}

function screenSizeIsOk(){
  // attempts to check window width and height, using first base JS then jquery.
  // if both fail, returns TRUE
  let w, h, minWidth = 800, midHeight = 600;
  try {
    // base javascript
    w = window.innerWidth;
    h = window.innerHeight;
    if (w == null | h == null) {throw "window.innerWidth/innerHeight failed.";}
  } catch (err) {
    try{
      // jquery
      w = $(window).width();
      h = $(window).height();
      if (w == null | h == null) {throw "$(window).width/height failed.";}
    } catch (err2) {
      // failure mode, returns true if both screen checks failed
      return true;
    }
  }
  // return dimension check if values are defined
  return w >= minWidth && h >= midHeight;
};

function promptScreenSize(){
  // set key press experiment type
  expType = 10;
  
  // prepare canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "25px Arial";
  
  // allows up to two warnings before terminating experiment
  if (screenSizePromptCount < numScreenSizeWarnings) {
    screenSizePromptCount++;
    
    // display screen size prompt
    ctx.font = "25px Arial";
    ctx.fillText("Your screen is not full screen or the",myCanvas.width/2,myCanvas.height/2);
    ctx.fillText("screen size on your device is too small.",myCanvas.width/2,(myCanvas.height/2) + 40);
    ctx.fillText("If this issue persists, you will need",myCanvas.width/2,(myCanvas.height/2)+160);
    ctx.fillText("to restart the experiment and will ",myCanvas.width/2,(myCanvas.height/2)+200);
    ctx.fillText("not be paid for your previous time.",myCanvas.width/2,(myCanvas.height/2)+240);
    ctx.font = "bold 25px Arial";
    ctx.fillText("Please correct this and press any button to continue.",myCanvas.width/2,(myCanvas.height/2)+100);
    
  } else {
    
    // display screen size prompt
    ctx.fillText("Your screen is not full screen",myCanvas.width/2,myCanvas.height/2);
    ctx.fillText("or the screen size on your device is too small.",myCanvas.width/2,(myCanvas.height/2)+50);
    ctx.font = "bold 25px Arial";
    ctx.fillText("Please refresh the page to restart the experiment.",myCanvas.width/2,(myCanvas.height/2)+100);
    
  }
}
