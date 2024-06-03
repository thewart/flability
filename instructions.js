// see function navigateInstructionPath() in tasks.js for naviagtion code

// global instruction iterator information. Change as needed
let instructions = {
  // contains the iterator for each instruction block
  iterator: {
    "prac1-1": 1, "prac1-2": 1, "prac2": 1, "prac3": 1, "main1": 1, "main2": 1
  },
  // contains the max value of each instruction iteration. iteration will STOP at max.
  max: {
    "prac1-1": 4, "prac1-2": 4, "prac2": 4, "prac3": 5, "main1": 4, "main2": 4
  },
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
let iterateAgain = false, task;

function navigateInstructionPath(repeat = false){
  if (repeat == true) {
    // if multi stage instructions, ensures it goes back to first not second
    switch (expStage){
      case "prac1-1":
      case "prac1-2":
        expStage = "prac1-1";
        break;
    }
    runInstructions();
  } else {
    switch (expStage){
      case "prac1-1":
        expStage = "prac1-2";
        break;
      case "prac1-2":
        expStage = "prac2";
        break;
      case "prac2":
        expStage = "prac3";
        break;
      case "prac3":
        expStage = "prac4";
        break;
      case "prac4":
        expStage = "main1";
        break;
      case "main1":
        expStage = "main2";
        break;
    }
    runInstructions();
  }
}

function runInstructions(){
  // main instruction function (come here at start of instruction block)
  sectionStart = new Date().getTime() - runStart;
  sectionType = "instructions";

  // hide/clear everything, just in case
  hideInstructions();

  // hide canvas if visible
  canvas.style.display = "none";

  // if need to repeat instructions (e.g., participant failed to meet accuracy requirement), then reshow all instructions
  if (instructions["iterator"][expStage] >= instructions["max"][expStage]){

    // loop through instructions and show
    for (var i = 1; i <= instructions["max"][expStage]; i++) {
      $('#instructions' + i).text( getNextInstructions( i, expStage ));
    }

    // reset iterateAgain incase looping turned it on by accident
    iterateAgain = false;

    // display instructions and prepare exit response mapping
    $('.instructions').show();
    exitResponse();

  } else {

    // remove any previous click listeners, if any
    $(document).off("click","#nextInstrButton");
    $(document).off("click","#startExpButton");
    $(document).off("click","#nextSectionButton");

    // clear all previous instructions, reset styles, and remove pictures
    for (let i = 1; i <= 8; i++) {
      $('#instructions' + i).remove();
      // resetDefaultStyles('#instructions' + i);
      $('.insertedImage').remove();
    }

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
    $('.insertedImage').remove();

    console.log("button click");
    // log data for time spent on this section
    sectionEnd = new Date().getTime() - runStart;
    data.push([expStage, sectionType, block, blockType, 
      NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 
      sectionStart, sectionEnd, sectionEnd - sectionStart]);
    console.log(data);

    // clear all button press listeners
    $(document).off("click","#nextInstrButton");
    $(document).off("click","#startExpButton");
    $(document).off("click","#nextSectionButton");
    runTasks();
  });

  $(document).on('click', '#nextSectionButton', function(){
    // log data for time spent on this section
    sectionEnd = new Date().getTime() - runStart;
    data.push([expStage, sectionType, block, blockType, 
      NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 
      sectionStart, sectionEnd, sectionEnd - sectionStart]);
    console.log(data);

    // clear all button press listeners
    $(document).off("click","#nextInstrButton");
    $(document).off("click","#startExpButton");
    $(document).off("click","#nextSectionButton");
    navigateInstructionPath();
  });
};

function iterateInstruction(){
  let instrNum = instructions["iterator"][expStage];
  var new_row = document.createElement( "div" );
  new_row.setAttribute( "id", 'instructions' + instrNum);
  $('.instruction-body')[0].appendChild( new_row );

  // $('#instructions' + instrNum).show();
  $('#instructions' + instrNum)[0].innerHTML = getNextInstructions(instrNum, expStage);

  // iterate as appropriate or allow next phase
  if (instrNum < instructions["max"][expStage]){
    instructions["iterator"][expStage]++;
  } else{
    exitResponse();
  }

  if (iterateAgain == true) {
    iterateAgain = false;
    iterateInstruction();
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

  // clear text from instruction DOMs
  for (let i = 1; i <= 9; i++) {
    // $('#instructions' + i).text("");
    $('#instructions' + i).remove()
    // resetDefaultStyles('#instructions' + i);
    $('.insertedImage').remove();
  }
}

function resetDefaultStyles(domObject){
  $(domObject).css('font-weight','');
  $(domObject).css('font-size','');
  $(domObject).css('color','');
  $(domObject).css('margin-top','');
  $(domObject).css('margin-bottom','');
}
