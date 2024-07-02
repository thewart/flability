function getInstructionText(){
  let task1 = taskName[pracOrder[0]];
  let task2 = taskName[pracOrder[1]];
  // let color1 = taskColor[Object.keys(taskName).find(key => taskName[key] === task1)];
  // let color2 = taskColor[Object.keys(taskName).find(key => taskName[key] === task2)];
  let color1 = taskColor[pracOrder[0]];
  let color2 = taskColor[pracOrder[0]];

  let eN1 = elemNames[pracOrder[0]];
  let eN2 = elemNames[pracOrder[1]];
  // let eL1 = Object.keys(eN1);
  // let eL2 = Object.keys(eN2);

  let rM1 = singleTaskMap[pracOrder[0]];
  let rM2 = singleTaskMap[pracOrder[1]];
  console.log(rM1)

  let eR1 = getKeyByValue(rM1, respR);
  let eL1 = getKeyByValue(rM1, respL);

  let eR2 = getKeyByValue(rM2, respR);
  let eL2 = getKeyByValue(rM2, respL);

  let elemType;

  if (stimType === "cvt") {
    elemType = "shapes";
    // let dirL = (respL === respUp ? "up" : "down");
    // let dirR = (respR === respUp ? "up" : "down");
  } else if (stimType === "orientedBars") {
    // let dirL = "left";
    // let dirR = "right";
  }

  let realPracTrials = Object.keys(stimSet).length * numPracticeReps;
  let blockTime = Math.ceil(trialsPerBlock * (fixInterval + stimInterval + 0.5*(itiMax + itiMin)) / (1000 * 60));
  let beginText = " Please place your hands on the '" + respL + "' and '" + respR + "' keys as shown.</p>" +
   "<img src=/images/handsOnKeyboard6.png>" +  "<p><b>Press any button to begin</b>.</p>";

  let instructionText = {
    'prac1-1': [
      "<p>In this task, you will see a grid of " + elemType + ", such as those above, in the middle of the screen." + 
      " On each trial, you will need to classify either the " + task1 + " (" + eN1[eL1] + " or " + eN1[eR1] +
       ") or the " + task2 + " (" + eN2[eL2] + " or " + eN2[eR2] +
       ") of the " + elemType + ".</p>",
      
      // "<p>On some trials you will need to identify the inner two arrows," + "\n" +
      // "while on other trials, you will need to identify the outer two arrows.</p>",

      "<p>On each trial, a colored circle surrounding the grid of " + elemType + " will indicate" + 
      " whether you should respond to the " + task1 + " or the " + task2 + ".</p>",

      "You will begin with a few practice blocks to familiarize you with the task before beginning the main experiment." +
       "\n" + "You will need to get at least " + practiceAccCutoff + 
       "% correct on each practice block before you can move on to the next one."
    ],

    'prac1-2': [
      "<p>In the first practice task, you will indicate whether the " + elemType + " are " + eN1[eL1] + 
      " or " + eN1[eR1] + ".</p>",

      "<p>Press '" + respL + "' with your left hand index finger if the " + elemType + 
      " are " + eN1[eL1] + ".</p>",

      "<p>Press '" + respR + "' with your right hand index finger if the " + elemType + 
      " are " + eN1[eR1] + ".</p>",

      "<p>This block contains " + realPracTrials + " trials." + beginText
    ],

    'prac2': [
      "<p>In the second practice task, you will indicate whether the " + elemType + " are " + eN2[eL2] + 
      " or " + eN2[eR2] + ".</p>",

      "<p>Press '" + respL + "' with your left hand index finger if the " + elemType + 
      " are " + eN2[eL2] + ".</p>",

      "<p>Press '" + respR + "' with your right hand index finger if the " + elemType + 
      " are " + eN2[eR2] + ".</p>",

      "<p>This block contains " + realPracTrials + " trials." + beginText
    ],

    'prac3': [
      // "<p>In this last practice task, you will either indicate to the <b>" + task1 + "</b> or <b>" + task2 +
      // "</b> arrows, \n depending on the color of the circle surrounding them.</p>",

      // "<p>However, the circle will contain segments of both " + color1 + " and " + color2 +
      // ".\n Choose your response based on which color the circle contains more of.",

      // "<p>If the circle is more " + color1 + ", indicate the direction of the <b>" + task1 + "</b> arrows.</p>",

      // "<p>If the circle is more " + color2 + ", indicate the direction of the <b>" + task2 + "</b> arrows.</p>",

      // "<p>As before, press '" + respL + "' if the relevant arrows are pointing " + dirL + ", and \n press '" + respR +
      // "' if the relevant arrows are pointing " + dirR + ".</p>",

      // "<p>This block contains " + (realPracTrials * 2) + " trials." + beginText
    ], 

    'main1': [
    //   "<p>Great job! You are now ready to begin the main experiment.</p>",

    //   "<p>This experiment consists of " + numBlocks +" blocks, with each block lasting about " 
    //   + blockTime + " minutes.</p>",

    //   "<p>Each block will be similar to the practice task you just completed. " + 
    //   "\n However, in each block the balance of colors in the circle will be different.",

    //   "<p>For example, in one block the circle might be nearly all one color, as in the example on the left." + 
    //   "\n In another block the amounts of " + color1 + " and " + color2 + " might be more balanced," + 
    //   " as in the example on the right.</p>",

    //   "<p>In these examples, the circle on the left is mostly " + color1 + ", so you would respond to the <b>"
    //   + task1 + "</b> arrows.</p>",

    //   "<p>The circle on the right is mostly " + color2 + ", so you would respond to the <b>" 
    //   + task2 + "</b> arrows.</p>"
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
  // let task1 = taskName[pracOrder[0]];
  // let task2 = taskName[pracOrder[1]];
  // let color1 = taskColor[Object.keys(taskName).find(key => taskName[key] === task1)];
  // let color2 = taskColor[Object.keys(taskName).find(key => taskName[key] === task2)];

  // ctx.clearRect(0, 0, instrCanvas.width, instrCanvas.height);
  // let stimOpts = {fontSize: 50, gap: 0.4*50};
  // let cueOpts = {lineWidth: 7, numSegments: 6, radius: 75};

  // if (expStage === "prac1-1") {
  //   drawSandwich(stimElem[0], stimElem[1], stimOpts);
  //   drawCircle((color1 === 'red') ? 1 : 0, cueOpts);

  // } else if (expStage === "prac1-2") {
  //   let inColor = (task1 === 'inner') ? 'black' : 'gray';
  //   let outColor = (task1 === 'inner') ? 'gray' : 'black';
  //   drawSandwich(stimElem[0], stimElem[1], stimOpts, inColor, outColor);
  //   drawCircle((color1 === 'red') ? 1 : 0, cueOpts);

  // } else if (expStage === 'prac2') {
  //   let inColor = (task2 === 'inner') ? 'black' : 'gray';
  //   let outColor = (task2 === 'inner') ? 'gray' : 'black';
  //   drawSandwich(stimElem[0], stimElem[1], stimOpts, inColor, outColor);
  //   drawCircle((color2 === 'red') ? 1 : 0, cueOpts);

  // } else if (expStage === 'prac3') {
  //   let inColor = (task1 === 'inner') ? 'black' : 'gray';
  //   let outColor = (task1 === 'inner') ? 'gray' : 'black';
  //   drawSandwich(stimElem[0], stimElem[1], Object.assign(stimOpts, {offsetX: -100}), inColor, outColor);
  //   drawCircle((color1 === 'red') ? 0.75 : 0.25, Object.assign(cueOpts, {offsetX: -100}));

  //   inColor = (task2 === 'inner') ? 'black' : 'gray';
  //   outColor = (task2 === 'inner') ? 'gray' : 'black';
  //   drawSandwich(stimElem[0], stimElem[1], Object.assign(stimOpts, {offsetX: 100}), inColor, outColor);
  //   drawCircle((color2 === 'red') ? 0.75 : 0.25, Object.assign(cueOpts, {offsetX: 100}));

  // } else if (expStage === 'main1' || expStage === 'main2') {
  //   let inColor = (task1 === 'inner') ? 'black' : 'gray';
  //   let outColor = (task1 === 'inner') ? 'gray' : 'black';
  //   drawSandwich(stimElem[0], stimElem[1], Object.assign(stimOpts, {offsetX: -100}), inColor, outColor);
  //   drawCircle((color1 === 'red') ? 0.9 : 0.1, Object.assign(cueOpts, {offsetX: -100}));

  //   inColor = (task2 === 'inner') ? 'black' : 'gray';
  //   outColor = (task2 === 'inner') ? 'gray' : 'black';
  //   drawSandwich(stimElem[0], stimElem[1], Object.assign(stimOpts, {offsetX: 100}), inColor, outColor);
  //   drawCircle((color2 === 'red') ? 0.6 : 0.4, Object.assign(cueOpts, {offsetX: 100}));
  // }
}