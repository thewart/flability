function getInstructionText(){
  let task1 = taskName[pracOrder[0]];
  let task2 = taskName[pracOrder[1]];
  let color1 = taskColor[pracOrder[0]];
  let color2 = taskColor[pracOrder[1]];

  let eN1 = elemNames[pracOrder[0]];
  let eN2 = elemNames[pracOrder[1]];

  let rM1 = singleTaskMap[pracOrder[0]];
  let rM2 = singleTaskMap[pracOrder[1]];

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
   "<img src=/images/handsOnKeyboard6.png height=200>" +  "<p><b>Press any button to begin</b>.</p>";

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
      "<p>When the circle is " + color1 + ", you will indicate whether the " + elemType + " are " + eN1[eL1] + 
      " or " + eN1[eR1] + ".</p>",

      "<p>Press '" + respL + "' with your left hand index finger if the " + elemType + 
      " are " + eN1[eL1] + ".</p>",

      "<p>Press '" + respR + "' with your right hand index finger if the " + elemType + 
      " are " + eN1[eR1] + ".</p>",

      "<p>This block contains " + realPracTrials + " trials." + beginText
    ],

    'prac2': [
      "<p>When the circle is " + color2 + ", you will indicate whether the " + elemType + " are " + eN2[eL2] + 
      " or " + eN2[eR2] + ".</p>",

      "<p>Press '" + respL + "' with your left hand index finger if the " + elemType + 
      " are " + eN2[eL2] + ".</p>",

      "<p>Press '" + respR + "' with your right hand index finger if the " + elemType + 
      " are " + eN2[eR2] + ".</p>",

      "<p>This block contains " + realPracTrials + " trials." + beginText
    ],

    'prac3': [
      "<p>In this last practice task, you will either indicate to the the " + task1 + " or the " + task2 + 
      " of the " + elemType + ", depending on the color of the circle surrounding them.</p>",

      "<p>However, the circle will contain segments of both " + color1 + " and " + color2 +
      ".\n Choose your response based on which color the circle contains more of.",

      "<p>If the circle is more " + color1 + ", respond based on the " + task1 + 
      " (" + eN1[eL1] + " or " + eN1[eR1] + ") of the " + elemType + ".</p>",

      "<p>If instead the circle is more " + color2 + ", respond based on the " + task2 + 
      " (" + eN2[eL2] + " or " + eN2[eR2] + ") of the " + elemType + ".</p>",

      // "<p>As before, press '" + respL + "' if the relevant arrows are pointing " + dirL + ", and \n press '" + respR +
      // "' if the relevant arrows are pointing " + dirR + ".</p>",

      "<p>This block contains " + (realPracTrials * 2) + " trials." + beginText
    ], 

    'main1': [
      "<p>Great job! You are now ready to begin the main experiment.</p>",

      "<p>This experiment consists of " + numBlocks +" blocks, with each block lasting about " 
      + blockTime + " minutes.</p>",

      "<p>Each block will be similar to the practice task you just completed. " + 
      "\n However, in each block the balance of colors in the circle will be different.",

      "<p>For example, in one block the circle might be nearly all one color, as in the example on the left." + 
      "\n In another block the amounts of " + color1 + " and " + color2 + " might be more balanced," + 
      " as in the example on the right.</p>",

      "<p>In these examples, the circle on the left is mostly " + color1 + ", so you would respond based on the "
      + task1 + " (" + eN1[eL1] + " or " + eN1[eR1] + ") of the " + elemType + ".</p>",

      "<p>The circle on the right is mostly " + color2 + ", so you would respond based on the " + task2 + 
      " (" + eN2[eL2] + " or " + eN2[eR2] + ") of the " + elemType + ".</p>"
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
  let task1 = taskName[pracOrder[0]];
  let task2 = taskName[pracOrder[1]];
  let color1 = taskColor[pracOrder[0]];
  let color2 = taskColor[pracOrder[0]];
  let eN1 = elemNames[pracOrder[0]];
  let eN2 = elemNames[pracOrder[1]];
  let rM1 = singleTaskMap[pracOrder[0]];
  let rM2 = singleTaskMap[pracOrder[1]];
  let eR1 = getKeyByValue(rM1, respR);
  let eL1 = getKeyByValue(rM1, respL);
  let eR2 = getKeyByValue(rM2, respR);
  let eL2 = getKeyByValue(rM2, respL);
  let aIs1 = pracOrder[0] === 'taskA';

  ctx.clearRect(0, 0, instrCanvas.width, instrCanvas.height);
  let gridSize = 75;
  let dimLen = 3;
  let cellArea = (gridSize * gridSize) / (dimLen * dimLen);
  let stimOpts = {nRow: dimLen, nCol: dimLen, gridSize: gridSize, element: {}, offsetY:-40}
  stimOpts.element = {area: cellArea*0.2, fillStyle: "black", lineWidth: 2};
  let cueOpts = {lineWidth: 7, numSegments: 6, radius: 75, offsetY:-40};
  ctx.fillStyle = "black";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let dd = 325;
  let d = 150;
  let x0 = ctx.canvas.width/2;
  let y0 = ctx.canvas.height/2
  let textd = 60;
  let lined = 25;

  if (expStage === "prac1-1") {
    let stimType = aIs1 ? eL1 + eL2: eL2 + eL1;
    let stimL = randElemVec(stimType, 1.0, 1.0);
    drawCircleCue((color1 === 'red') ? 1 : 0, Object.assign(cueOpts, {offsetX: -100}));
    drawElementGrid(stimL, Object.assign(stimOpts, {offsetX: -100}));

    stimType = aIs1 ? eR1 + eR2: eR2 + eR1;
    let stimR = randElemVec(stimType, 1, 1);
    drawElementGrid(stimR, Object.assign(stimOpts, {offsetX: 100}));
    drawCircleCue((color1 === 'red') ? 0 : 1, Object.assign(cueOpts, {offsetX: 100}));

  } else if (expStage === "prac1-2") {
    let stimType = aIs1 ? eL1 + eL2: eL2 + eL1;
    let stimL = randElemVec(stimType, 1.0, 1.0);
    drawCircleCue((color1 === 'red') ? 1 : 0, Object.assign(cueOpts, {offsetX: -dd}));
    drawElementGrid(stimL, Object.assign(stimOpts, {offsetX: -dd}));
    stimType = aIs1 ? eL1 + eR2: eR2 + eL1;
    stimL = randElemVec(stimType, 1.0, 1.0);
    drawCircleCue((color1 === 'red') ? 1 : 0, Object.assign(cueOpts, {offsetX: -d}));
    drawElementGrid(stimL, Object.assign(stimOpts, {offsetX: -d}));
    drawMultilineText("Press '" + respL + "'\nfor " + eN1[eL1], x0 - (dd+d)/2, y0 + textd, lined)

    stimType = aIs1 ? eR1 + eL2: eL2 + eR1;
    let stimR = randElemVec(stimType, 1, 1);
    drawElementGrid(stimR, Object.assign(stimOpts, {offsetX: d}));
    drawCircleCue((color1 === 'red') ? 1 : 0, Object.assign(cueOpts, {offsetX: d}));
    stimType = aIs1 ? eR1 + eR2: eR2 + eR1;
    stimR = randElemVec(stimType, 1, 1);
    drawElementGrid(stimR, Object.assign(stimOpts, {offsetX: dd}));
    drawCircleCue((color1 === 'red') ? 1 : 0, Object.assign(cueOpts, {offsetX: dd}));
    drawMultilineText("Press '" + respR + "'\nfor " + eN1[eR1], x0 + (dd+d)/2, y0 + textd, lined)

  } else if (expStage === 'prac2') {
    let stimType = aIs1 ? eL1 + eL2: eL2 + eL1;
    let stimL = randElemVec(stimType, 1.0, 1.0);
    drawCircleCue((color1 === 'red') ? 0 : 1, Object.assign(cueOpts, {offsetX: -dd}));
    drawElementGrid(stimL, Object.assign(stimOpts, {offsetX: -dd}));
    stimType = aIs1 ? eR1 + eL2: eL2 + eR1;
    stimL = randElemVec(stimType, 1.0, 1.0);
    drawCircleCue((color1 === 'red') ? 0 : 1, Object.assign(cueOpts, {offsetX: -d}));
    drawElementGrid(stimL, Object.assign(stimOpts, {offsetX: -d}));
    drawMultilineText("Press '" + respL + "'\nfor " + eN2[eL2], x0 - (dd+d)/2, y0 + textd, lined)

    stimType = aIs1 ? eL1 + eR2: eR2 + eL1;
    let stimR = randElemVec(stimType, 1, 1);
    drawElementGrid(stimR, Object.assign(stimOpts, {offsetX: d}));
    drawCircleCue((color1 === 'red') ? 0 : 1, Object.assign(cueOpts, {offsetX: d}));
    stimType = aIs1 ? eR1 + eR2: eR2 + eR1;
    stimR = randElemVec(stimType, 1, 1);
    drawElementGrid(stimR, Object.assign(stimOpts, {offsetX: dd}));
    drawCircleCue((color1 === 'red') ? 0 : 1, Object.assign(cueOpts, {offsetX: dd}));
    drawMultilineText("Press '" + respR + "'\nfor " + eN2[eR2], x0 + (dd+d)/2, y0 + textd, lined)

  } else if (expStage === 'prac3') {
    let cueProp = 0.75;
    let stimType = aIs1 ? eL1 + eR2: eR2 + eL1;
    let stimL = randElemVec(stimType, 1.0, 1.0);
    drawCircleCue((color1 === 'red') ? cueProp : 1-cueProp, Object.assign(cueOpts, {offsetX: -dd}));
    drawElementGrid(stimL, Object.assign(stimOpts, {offsetX: -dd}));
    drawMultilineText("Press '" + respL + "'\n for " + eN1[eL1], x0 - dd, y0 + textd, lined)

    stimType = aIs1 ? eR1 + eL2: eL2 + eR1;
    let stimR = randElemVec(stimType, 1.0, 1.0);
    drawCircleCue((color1 === 'red') ? cueProp : 1-cueProp, Object.assign(cueOpts, {offsetX: -d}));
    drawElementGrid(stimR, Object.assign(stimOpts, {offsetX: -d}));
    drawMultilineText("Press '" + respR + "'\n for " + eN1[eR1], x0 - d, y0 + textd, lined)
    
    stimType = aIs1 ? eR1 + eL2: eL2 + eR1;
    stimL = randElemVec(stimType, 1, 1);
    drawElementGrid(stimL, Object.assign(stimOpts, {offsetX: d}));
    drawCircleCue((color1 === 'red') ? 1-cueProp : cueProp, Object.assign(cueOpts, {offsetX: d}));
    drawMultilineText("Press '" + respL + "'\n for " + eN2[eL2], x0 + d, y0 + textd, lined)
    
    stimType = aIs1 ? eL1 + eR2: eR2 + eL1;
    stimR = randElemVec(stimType, 1, 1);
    drawElementGrid(stimR, Object.assign(stimOpts, {offsetX: dd}));
    drawCircleCue((color1 === 'red') ? 1-cueProp : cueProp, Object.assign(cueOpts, {offsetX: dd}));
    drawMultilineText("Press '" + respR + "'\n for " + eN2[eR2], x0 + dd, y0 + textd, lined)
    
  } else if (expStage === 'main1' || expStage === 'main2') {

    let stimType = aIs1 ? eL1 + eR2: eR2 + eL1;
    let stimL = randElemVec(stimType, 1.0, 1.0);
    drawCircleCue((color1 === 'red') ? 0.9 : 0.1, Object.assign(cueOpts, {offsetX: -100}));
    drawElementGrid(stimL, Object.assign(stimOpts, {offsetX: -100}));
    drawMultilineText("Press '" + respL + "'\n for " + eN1[eL1], x0 - 100, y0 + textd, lined)

    drawCircleCue((color1 === 'red') ? 0.4 : 0.6, Object.assign(cueOpts, {offsetX: 100}));
    drawElementGrid(stimL, Object.assign(stimOpts, {offsetX: 100}));
    drawMultilineText("Press '" + respR + "'\n for " + eN2[eR2], x0 + 100, y0 + textd, lined)
  }
}