// create global curStage variable
let curStage = 0;
console.log(curStage)

// creates popup window
function basicPopup(url) {
  // opens popup with certain settings
  popupWindow = window.open(url,'popUpWindow','height=' + screen.height + ',width=' + screen.width + ',left=0,top=0,resizable=yes,scrollbars=yes,toolbar=no, menubar=no,location=no,directories=no,status=yes');
}

// this function allows Mturkers to get paid with their id
// function gup(name, tmpURL){
//   let regexS = "[\\?&]"+name+"=([^&#]*)";
//   let results = new RegExp(regexS).exec(tmpURL);
//   return (results == null) ? "" : results[1];
// }

// // stop users from closing the menu.html window
// window.onbeforeunload = function() {
//     return 'You have unsaved changes!';
// }

// for testing, gets experiment set up immediately
function startExperiment(){
  prepareMenu();
  updateMainMenu(1);
}

// function for navigating experiment stages
function updateMainMenu(expStage){
  // update global curstage variable
  curStage = expStage;

  // display text based on experiment stage
  switch(expStage){
    case 0: //consent 
    console.log('here I am')
      $("#myButton").show();
      $("#submit").hide();
      $("#instruction").text("Click button to read the consent form. PLEASE DO NOT CLOSE THIS SCREEN.");
      $("#instruction").show();
      break;
    case 1: // demographics
      $("#myButton").show();
      //$("#submit").hide();
      $("#instruction").text("Click button to fill out demographic survey. PLEASE DO NOT CLOSE THIS SCREEN.");
      $("#instruction").show();
      break;
    case 2: //main task
      $("#myButton").show();
      $("#instruction").text("Click 'Continue' button to start the main task. PLEASE DO NOT CLOSE THIS SCREEN.");
      $("#instruction").show();
      break;
    case 3: //debriefing
      // remove onbeforeunload listener
      window.onbeforeunload = function (){}
      $("#instruction").hide();
      $("#myButton").hide();
      $("#redo").hide();
      $("#mainForm").show();
      break;
    case -1: //nonconsent
      $("#myButton").hide();
      $("#instruction").text("As you have indicated that you do not consent to participate in this study, '" + 
        "please close this window and withdraw from the study using the PSY Credit Experiment interface.");
      $("#instruction").show();

  }
}

// // prevent duplicate workers from completing task
// let workerArr = [];

// // checks if workerID exists in workerID array
// function duplicateWorker(workedID){
//   workerID = gup('workerID', document.referrer);
//   return jQuery.inArray(workerID, workerArr)!=-1 && workerID != "";
// }

$(document).ready(function(){
  // initial hide all DOM elements
  $("#mainForm").hide();
  $("#instructions").hide();
  $("#myButton").hide();
  $("#NoGo").hide();

  // gets MTurk Worker Information and assign to HTML elements
  //window.location.href, document.referrer
  // console.log(window.location.href);
  let partInfo = new URL(window.location.href).searchParams;

  punt = new Date().getTime();
  // document.getElementById('studyID').value = partInfo.has("STUDY_ID") ? partInfo.get("STUDY_ID") : "NA";
  // document.getElementById('sessionID').value = partInfo.has("SESSION_ID") ? partInfo.get("SESSION_ID") : punt;
  // document.getElementById('workerID').value = partInfo.has("PROLIFIC_PID") ? partInfo.get("PROLIFIC_PID") : "NA";
  document.getElementById('surveyCode').value = partInfo.has("survey_code") ? partInfo.get("survey_code") : "NA";
  prepareMenu();

});

function prepareMenu(){
  // update menu to first value
  updateMainMenu(curStage);

  // create button press code for switching between sections
  $("#myButton").click(function(){
    switch(curStage){
      case 0:
        basicPopup("html/consent.html")
        break;
      case 1:
        basicPopup("/html/demographics.html");
        break;
      case 2:
        basicPopup("/html/main.html");
    }
  });
}

