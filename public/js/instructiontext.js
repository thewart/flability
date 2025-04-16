function getInstructionText(){
  let task1 = taskName[pracOrder[0]];
  let task2 = taskName[pracOrder[1]];
  let color1 = taskColor[pracOrder[0]];
  let color2 = taskColor[pracOrder[1]];

  let eN1 = elemNames[pracOrder[0]];
  let eN2 = elemNames[pracOrder[1]];
  // console.log(eN1, eN2)

  let tM1 = singleTaskMap[pracOrder[0]];
  let tM2 = singleTaskMap[pracOrder[1]];

  // console.log(rM1, rM2)

  let eRR = getKeyByValue(tM1, respRR); 
  let eR = getKeyByValue(tM1, respR);
  let eL = getKeyByValue(tM1, respL);
  let eLL = getKeyByValue(tM1, respLL);

  let realPracTrials = numPracticeTrials;
  let blockTime = Math.ceil(trialsPerBlock * (fixInterval + stimInterval/2 + 0.5*(itiMax + itiMin)) / (1000 * 60));
  let beginText = " Please place your hands on the '" + respL + "' and '" + respR + "' keys as shown.</p>" +
   "<img src=/images/four_finger_keyhands.png height=200>" +  "<p><b>Press any button to begin</b>.</p>";

  let instructionText = {
    'prac1-1': [
      "<p>In this experiment, you will see a target displayed inside a circle in the middle of the screen." + 
      "\n Your job is to quickly make the correct response to the target.</p>",

      "<p>The target will be a single color word printed in the middle of the screen, as shown above." +
      " This word will also be printed in color." +
      " However, the color word will not always match the color of the print</p>",

      "<p>On each trial, you will need to do one of two possible tasks: reading the word, or identifying the color the word is printed in.</p>",
      
      "<p>A black-and-white circle surrounding the word will indicate whether you should read the word or identify the color.",

      "You will begin with a few practice blocks to familiarize you with the tasks before beginning the main experiment." +
       "\n" + "You will need to get at least " + practiceAccCutoff + "% correct on each practice block before you can move on to the next one."
    ],

    'prac1-2' : [
      "<p>First we will practice each task in isolation with simplified targets.</p>",

      "<p>When the circle is " + color1 + ", you will " + task1 + ".</p>",

      "<p>Press '" + respLL + "' with your left hand middle finger for the " + eN1[eLL] + ".</p>" +
      "<p>Press '" + respL + "' with your left hand index finger for the " + eN1[eL] + ".</p>" +
      "<p>Press '" + respR + "' with your right hand index finger for the " + eN1[eR] + ".</p>" +
      "<p>Press '" + respRR + "' with your right hand middle finger for the " + eN1[eRR] + ".</p>",

      "<p>This block contains " + realPracTrials + " trials." + beginText
    ],

    'prac2' : [
      "<p>Next we will practice the other task in isolation, again with simplified targets.</p>",

      "<p>When the circle is " + color2 + ", you will " + task2 + ".</p>",

      "<p>Press '" + respLL + "' with your left hand middle finger for the " + eN2[eLL] + ".</p>" +
      "<p>Press '" + respL + "' with your left hand index finger for the " + eN2[eL] + ".</p>" +
      "<p>Press '" + respR + "' with your right hand index finger for the " + eN2[eR] + ".</p>" +
      "<p>Press '" + respRR + "' with your right hand middle finger for the " + eN2[eRR] + ".</p>",
      "<p>This block contains " + realPracTrials + " trials." + beginText

    ],

    'prac3': [
      "<p>Next, we will practice each task seprately, but this time using color words in colored print.</p>",

      "<p>When the circle is " + color1 + ", you will " + task1 + ".</p>",

      "<p>Press '" + respLL + "' with your left hand middle finger for the " + eN1[eLL] + ".</p>" +
      "<p>Press '" + respL + "' with your left hand index finger for the " + eN1[eL] + ".</p>" +
      "<p>Press '" + respR + "' with your right hand index finger for the " + eN1[eR] + ".</p>" +
      "<p>Press '" + respRR + "' with your right hand middle finger for the " + eN1[eRR] + ".</p>",

      "<p>This block contains " + realPracTrials + " trials." + beginText
    ],

    'prac4': [
      "<p>Next, we will practice the other task, again using color words in colored print.</p>",

      "<p>When the circle is " + color2 + ", you will " + task2 + ".</p>",

      "<p>Press '" + respLL + "' with your left hand middle finger for the " + eN2[eLL] + ".</p>" +
      "<p>Press '" + respL + "' with your left hand index finger for the " + eN2[eL] + ".</p>" +
      "<p>Press '" + respR + "' with your right hand index finger for the " + eN2[eR] + ".</p>" +
      "<p>Press '" + respRR + "' with your right hand middle finger for the " + eN2[eRR] + ".</p>",

      "<p>This block contains " + realPracTrials + " trials." + beginText
    ],

    'prac5': [
      "<p>In this last practice task, you will either " + task1 + " or " + task2 + 
      ",\n depending on the shading of the circle surrounding the target.</p>",

      "<p>However, the circle will contain segments of both " + color1 + " and " + color2 +
      ".\n Choose your response based on which the circle contains more of.",

      "<p>If the circle is more " + color1 + " than " + color2 + ", you should " + task1 + ".</p>",

      "<p>If instead the circle is more " + color2 + " than " + color1 + ", you should " + task2 + ".</p>",

      "<p>This block contains " + realPracTrials + " trials." + beginText
    ], 

    'main1': [
      "<p>Great job! You are now ready to begin the main experiment.</p>",

      "<p>This experiment consists of " + numBlocks +" blocks, with each block lasting about " 
      + blockTime + " minutes.</p>",

      "<p>Each block will be similar to the practice task you just completed. " + 
      "\n However, in each block the balance of shading in the circle will be different.",

      "<p>For example, in one block the circle might be nearly all one shade, as in the example on the left." + 
      "\n In another block the amounts of " + color1 + " and " + color2 + " might be more balanced," + 
      " as in the example on the right.</p>",

      "<p>In these examples, the circle on the left is mostly " + color1 + 
      ", so you would " + task1 + ".</p>",

      "<p>The circle on the right is mostly " + color2 +
      ", so you would " + task2 + ".</p>",

    ],

    'main2': [
      "<p>Try to respond as quickly and as accuractely as possible on each trial, and to\n" + 
      " maintain at least 75% accuracy throughout the task.</p>",

      "<p>We will let you know how you are doing at each break.</p>" + beginText
    ]
  };

  return instructionText;
}

function instructionCode(expStage) {
  resetText = function() {
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  }

  drawExampleStim = function(color, stim, respWhich, elemName, disp, cueProp = 1.0) {
    drawCircleCue((color === colorA) ? cueProp : 1-cueProp, Object.assign(cueOpts, {offsetX: disp}));
    drawStimulus(stim, Object.assign(stimOpts, {offsetX: disp}));
    resetText();
    drawMultilineText("Press '" + respWhich + "' for the \n" + elemName, x0 + disp, y0 + textd, lined)
  }

  getRandStim = function(respMap, respWhich) {
    return _.sample(getAllKeysByValue(respMap, respWhich));
  }

  let ptM1 = pracRespMap[pracOrder[0]];
  let ptM2 = pracRespMap[pracOrder[1]];
  let task1 = taskName[pracOrder[0]];
  let task2 = taskName[pracOrder[1]];
  let color1 = taskColor[pracOrder[0]];
  let color2 = taskColor[pracOrder[1]];
  let rM1 = respMap[pracOrder[0]];
  let rM2 = respMap[pracOrder[1]];
  
  let tM1 = singleTaskMap[pracOrder[0]];
  let tM2 = singleTaskMap[pracOrder[1]];

  let eN1 = elemNames[pracOrder[0]];
  let eN2 = elemNames[pracOrder[1]];

  let eRR = getKeyByValue(tM1, respRR); 
  let eR = getKeyByValue(tM1, respR);
  let eL = getKeyByValue(tM1, respL);
  let eLL = getKeyByValue(tM1, respLL);

  // let aIs1 = pracOrder[0] === 'taskA';

  ctx.clearRect(0, 0, instrCanvas.width, instrCanvas.height);
  let cueOpts = {lineWidth: 7, numSegments: 6, radius: 75, offsetY:-40};
  let stimOpts = {fontSize: 45, offsetY:-35}
  let dd = 325;
  let d = 150;
  let x0 = ctx.canvas.width/2;
  let y0 = ctx.canvas.height/2
  let textd = 60;
  let lined = 25;

  if (expStage === "prac1-1") {

    let stim = _.sample(getAllKeysByValue(rM1, respL));
    drawCircleCue((color1 === colorA) ? 1 : 0, cueOpts);
    drawStimulus(stim, stimOpts);

  } else if (expStage === "prac1-2") {
    drawExampleStim(color1, getKeyByValue(ptM1, respLL), respLL, eN1[eLL], -dd);
    drawExampleStim(color1, getKeyByValue(ptM1, respL), respL, eN1[eL], -d);
    drawExampleStim(color1, getKeyByValue(ptM1, respR), respR, eN1[eR], d);
    drawExampleStim(color1, getKeyByValue(ptM1, respRR), respRR, eN1[eRR], dd);
    
  } else if (expStage === "prac2") {
    drawExampleStim(color2, getKeyByValue(ptM2, respLL), respLL, eN2[eLL], -dd);
    drawExampleStim(color2, getKeyByValue(ptM2, respL), respL, eN2[eL], -d);
    drawExampleStim(color2, getKeyByValue(ptM2, respR), respR, eN2[eR], d);
    drawExampleStim(color2, getKeyByValue(ptM2, respRR), respRR, eN2[eRR], dd);

  } else if (expStage === "prac3") {
    drawExampleStim(color1, getRandStim(rM1, respLL), respLL, eN1[eLL], -dd);
    drawExampleStim(color1, getRandStim(rM1, respL), respL, eN1[eL], -d);
    drawExampleStim(color1, getRandStim(rM1, respR), respR, eN1[eR], d);
    drawExampleStim(color1, getRandStim(rM1, respRR), respRR, eN1[eRR], dd);

  } else if (expStage === 'prac4') {

    drawExampleStim(color2, getRandStim(rM2, respLL), respLL, eN2[eLL], -dd);
    drawExampleStim(color2, getRandStim(rM2, respL), respL, eN2[eL], -d);
    drawExampleStim(color2, getRandStim(rM2, respR), respR, eN2[eR], d);
    drawExampleStim(color2, getRandStim(rM2, respRR), respRR, eN2[eRR], dd);

  } else if (expStage === 'prac5') {
    let cueProp = 0.75;
    let stimL = _.sample(intersect(incStim, getAllKeysByValue(rM1, respL)));
    let stimR = _.sample(intersect(incStim, getAllKeysByValue(rM2, respR)));

    drawExampleStim(color1, stimL, respL, eN1[eL], -d, cueProp);
    drawExampleStim(color2, stimR, respR, eN2[eR], d, cueProp);
    
  } else if (expStage === 'main1') {
    let stim = _.sample(intersect(incStim, getAllKeysByValue(rM1, respL)));
    drawExampleStim(color1, stim, respL, eN1[eL], -d, 0.9);
    drawExampleStim(color2, stim, respR, eN2[eR], d, 0.6);

    // drawCircleCue((color1 === 'red') ? 0.9 : 0.1, Object.assign(cueOpts, {offsetX: -100}));
    // drawStimulus(stim, Object.assign(stimOpts, {offsetX: -100}));
    // resetText();
    // drawMultilineText("Press '" + respL + "'\n for " + eL1, x0 - 100, y0 + textd, lined)

    // drawCircleCue((color1 === 'red') ? 0.4 : 0.6, Object.assign(cueOpts, {offsetX: 100}));
    // drawStimulus(stim, Object.assign(stimOpts, {offsetX: 100}));
    // resetText();
    // drawMultilineText("Press '" + respR + "'\n for " + eR2, x0 + 100, y0 + textd, lined);
  }
}