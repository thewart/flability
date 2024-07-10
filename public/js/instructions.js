// see function navigateInstructionPath() in tasks.js for naviagtion code

// global instruction iterator information. Change as needed
let numPracticeReps =  Math.ceil(numPracticeTrials / Object.keys(stimSet).length);
let instructions = {
  // contains the iterator for each instruction block
  iterator: {
    "prac1-1": 0, "prac1-2": 0, "prac2": 0, "prac3": 0, "main1": 0, 'main2': 0,
  },
  order: ["prac1-1", "prac1-2", "prac2", "prac3", "main1", "main2"],
  // what does instruction section end with?
  // #nextSectionButton, #startExpButton, buttonPressNextSection, buttonPressStartTask
  exitResponse: {
    "prac1-1": '#nextSectionButton',
    "prac1-2": 'buttonPressStartTask',
    "prac2": 'buttonPressStartTask',
    "prac3": 'buttonPressStartTask',
    "main1": '#nextSectionButton',
    "main2": 'buttonPressStartTask'
  }
};

// let iterateAgain = false, task;
let instructionText = getInstructionText();

function navigateInstructionPath(repeat = false){
  if (repeat == true) {
    // if multi stage instructions, ensures it goes back to first not second
    if (expStage === "prac1-2") expStage = "prac1-1";
  } else {
    let nextStage = instructions.order.indexOf(expStage) + 1;
    expStage = instructions.order[nextStage];
  }
  
  runInstructions();
}

function runInstructions(){ 
  // main instruction function (come here at start of instruction block)
  sectionStart = new Date().getTime() - runStart;
  sectionType = "instructions";

  // draw on instruction canvas
  ctx = instrCanvas.getContext('2d');
  
  // hide/clear everything, just in case
  hideInstructions();
  $('#myCanvas').hide();
  
  // execute code for this instruction stage (usually drawing on canvas)
  instructionCode(expStage);

  // if need to repeat instructions (e.g., participant failed to meet accuracy requirement), then reshow all instructions
  if (instructions["iterator"][expStage] >= instructionText[expStage].length) {
    
    // loop through instructions and show
    for (var i = 0; i < instructionText[expStage].length; i++) {
      $('#instruction-body').append(instructionText[expStage][i]);
    }
        
    // display instructions and prepare exit response mapping
    $('.instructions').show();
    exitResponse();
    
  } else {
    
    // remove any previous click listeners, if any
    $(document).off("click","#nextInstrButton");
    $(document).off("click","#startExpButton");
    $(document).off("click","#nextSectionButton");
    
    // clear all previous instructions, reset styles, and remove pictures
    $('#instruction-body').empty();
    
    // display proper instruction components, in case they are hidden
    $('.instructions').show();
    $('#nextInstrButton').show();
    $('#nextSectionButton').hide();
    $('#startExpButton').hide();
    displayDefaults(expStage);
  }
  
  /* code for "Next" button click during instruction display
  if running from Atom, need to use $(document).on, if through Duke Public Home Directory, either works.
  https://stackoverflow.com/questions/19237235/jquery-button-click-event-not-firing
  */
  $(document).on("click", "#nextInstrButton", function(){
    // $("#nextInstrButton").on('click', function(){
    iterateInstruction();
  });
  
  // code for click startExperiment button
  $(document).on('click', '#startExpButton', function(){
    $('.instructions').hide();
    $('#startExpButton').hide();
    // $('.insertedImage').remove();
    
    console.log("button click");
    // log data for time spent on this section
    
    // clear all button press listeners
    $(document).off("click","#nextInstrButton");
    $(document).off("click","#startExpButton");
    $(document).off("click","#nextSectionButton");
    runTasks();
  })
  
  $(document).on('click', '#nextSectionButton', function(){
    // log data for time spent on this section
    sectionEnd = new Date().getTime() - runStart;
    
    // clear all button press listeners
    $(document).off("click","#nextInstrButton");
    $(document).off("click","#startExpButton");
    $(document).off("click","#nextSectionButton");
    navigateInstructionPath();
  })
}

function iterateInstruction(){
  let instrNum = instructions["iterator"][expStage];
  $('#instruction-body').append(instructionText[expStage][instrNum]);
  instructions["iterator"][expStage]++;
  
  // iterate as appropriate or allow next phase
  if (instructions["iterator"][expStage] === instructionText[expStage].length){
    exitResponse();
  }
}

function exitResponse(){
  $('#nextInstrButton').hide();
  if (instructions["exitResponse"][expStage] == "#startExpButton"){
    $('#startExpButton').show();
  } else if (instructions["exitResponse"][expStage] == "#nextSectionButton") {
    $('#nextSectionButton').show();
  } else if (instructions["exitResponse"][expStage] == "buttonPressStartTask"){
    expType = 8;
  } else if (instructions["exitResponse"][expStage] == "buttonPressNextSection"){
    expType = 9;
  }
}

function displayDefaults(stage){
  // default values of instruction blocks. add any special cases
  switch(stage){
    // case "prac1-2":
    // case "prac1-3":
    //   showFirst();
    default:
    showFirst();
    $('.instruction-header').show();
    break;
  }
}

function getImageText(imageURL){
  let fileName = getFileName(imageURL);
  return "<img src='" + imageURL + "' class='insertedImage' id='"+ fileName +"'>";
}

function getFileName(path){
  let n = path.lastIndexOf('/');
  return path.substring(n + 1);
}

function showFirst() {
  iterateInstruction();
}

function changeTextFormat(elementName, property ,changeTo){
  $(elementName).css( property , changeTo );
}

function hideInstructions(){
  // remove any previous click listeners, if any
  $(document).off("click","#nextInstrButton");
  $(document).off("click","#startExpButton");
  $(document).off("click","#nextSectionButton");
  
  // hide instruction DOMs
  $('.instructions').hide();
  $('#startExpButton').hide();
  $('#nextSectionButton').hide();
  
  // clear text from instruction DOM
  $('#instruction-body').empty();
}
