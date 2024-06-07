function getInstructionText(){
  var task1 = taskName[pracOrder[0]];
  var task2 = taskName[pracOrder[1]];
  var color1 = taskColor[Object.keys(taskName).find(key => taskName[key] === task1)];
  var color2 = taskColor[Object.keys(taskName).find(key => taskName[key] === task2)];
  if (stimType === "flanker") {
    var dirL = (respL === respUp ? "up" : "down");
    var dirR = (respR === respUp ? "up" : "down");
  } else if (stimType === "sandwich") {
    var dirL = "left";
    var dirR = "right";
  }
  var blockTime = Math.ceil(trialsPerBlock * (fixInterval + stimInterval + 0.5*(itiMax + itiMin)) / (1000 * 60));
  var beginText = " Please place your hands on the '" + respL + "' and '" + respR + "' keys as shown.</p>" +
   "<img src=images/handsOnKeyboard6.png>" +  "<p><b>Press any button to begin</b>.</p>";

  var instructionText = {
    'prac1-1': [
      "<p>In this task, you will see a a set of four arrows, such as those above, in the middle of the screen." + "\n" + 
      "You will need to identify the arrows as either pointing " + dirL + " or as pointing " + dirR + " .</p>",
      
      "<p>On some trials you will need to identify the inner two arrows," + "\n" +
      "while on other trials, you will need to identify the outer two arrows.</p>",

      "<p>On each trial, a colored circle surrounding the arrows will indicate" + "\n" + 
      "whether you should respond to the inner or outer arrows.</p>",

      "You will begin with a few practice blocks to familiarize you with the task before beginning the main experiment." +
       "\n" + "You will need to get at least " + practiceAccCutoff + 
       "% correct on each practice block before you can move on to the next one."
    ],

    'prac1-2': [
      "<p>In the first practice task, you will indicate whether the <b>" + task1 +
      "</b> arrows are pointing " + dirL + " or " + dirR + ".</p>",

      "<p>Press '" + respL + "' with your left hand index finger if the <b>" + task1 +
      "</b> arrows are pointing " + dirL + ".</p>",

      "<p>Press '" + respR + "' with your right hand index finger if the <b>" + task1 + 
      "</b> arrows are pointing " + dirR + ". </p>",

      "<p>This block contains " + numPracticeTrials + " trials." + beginText
    ],

    'prac2': [
      "<p>In the second practice task, you will indicate whether the <b>" + task2 +
      "</b> arrows are pointing " + dirL + " or " + dirR + ".</p>",

      "<p>Press '" + respL + "' with your left hand index finger if the <b>" + task2 +
      "</b> arrows are pointing " + dirL + ".</p>",

      "<p>Press '" + respR + "' with your right hand index finger if the <b>" + task2 +
      "</b> arrows are pointing " + dirR + ". </p>",

      "<p>This block contains " + numPracticeTrials + " trials." + beginText
    ],

    'prac3': [
      "<p>In this last practice task, you will either respond to the <b>" + task1 + "</b> or <b>" + task2 +
      "</b> arrows, \n depending on the color of the circle surrounding them.</p>",

      "<p>However, the circle will contain segments of both " + color1 + " and " + color2 +
      ".\n Choose your response based on which color the circle contains more of.",

      "<p>If the circle is more " + color1 + ", indicate the direction of the <b>" + task1 + "</b> arrows.</p>",

      "<p>If the circle is more " + color2 + ", indicate the direction of the <b>" + task2 + "</b> arrows.</p>",

      "<p>As before, press '" + respL + "' if the relevant arrows are pointing " + dirL + ", and \n press '" + respR +
      "' if the relevant arrows are pointing " + dirR + ".</p>",

      "<p>This block contains " + (numPracticeTrials * 2) + " trials." + beginText
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

      "<p>In these examples, the circle on the right is mostly " + color1 + ", so you would respond to the <b>"
      + task1 + "</b> arrows.</p>",

      "<p>The circle on the left is mostly " + color2 + ", so you would respond to the <b>" 
      + task2 + "</b> arrows.</p>",

      // "As before, respond to the <b>" + task1 + "</b> arrows if the the circle is more " + color1 +
      // ",\n and to the <b>" + task2 + "</b> arrows if the circle is more " + color2 + ".",

      "<p>Try to respond as quickly and as accuractely as possible on each trial," + 
      "and to maintain at least 75% accuracy throughout the task." + '\n' +
      "We will let you know how you are doing at each break.</p>"
    ]
  };

  return instructionText;
}

function instructionCode(expStage) {
  var task1 = taskName[pracOrder[0]];
  var task2 = taskName[pracOrder[1]];
  var color1 = taskColor[Object.keys(taskName).find(key => taskName[key] === task1)];
  var color2 = taskColor[Object.keys(taskName).find(key => taskName[key] === task2)];

  ctx.clearRect(0, 0, instrCanvas.width, instrCanvas.height);
  var stimOpts = {fontSize: 50, gap: 0.4*50};
  var cueOpts = {lineWidth: 7, numSegments: 6, radius: 75};

  if (expStage === "prac1-1") {
    drawSandwich(stimElem[0], stimElem[1], stimOpts);
    drawCircle((color1 === 'red') ? 1 : 0, cueOpts);

  } else if (expStage === "prac1-2") {
    let inColor = (task1 === 'inner') ? 'black' : 'gray';
    let outColor = (task1 === 'inner') ? 'gray' : 'black';
    drawSandwich(stimElem[0], stimElem[1], stimOpts, inColor, outColor);
    drawCircle((color1 === 'red') ? 1 : 0, cueOpts);

  } else if (expStage === 'prac2') {
    let inColor = (task2 === 'inner') ? 'black' : 'gray';
    let outColor = (task2 === 'inner') ? 'gray' : 'black';
    drawSandwich(stimElem[0], stimElem[1], stimOpts, inColor, outColor);
    drawCircle((color2 === 'red') ? 1 : 0, cueOpts);

  } else if (expStage === 'prac3') {
    let inColor = (task1 === 'inner') ? 'black' : 'gray';
    let outColor = (task1 === 'inner') ? 'gray' : 'black';
    drawSandwich(stimElem[0], stimElem[1], Object.assign(stimOpts, {offsetX: -100}), inColor, outColor);
    drawCircle((color1 === 'red') ? 0.75 : 0.25, Object.assign(cueOpts, {offsetX: -100}));

    inColor = (task2 === 'inner') ? 'black' : 'gray';
    outColor = (task2 === 'inner') ? 'gray' : 'black';
    drawSandwich(stimElem[0], stimElem[1], Object.assign(stimOpts, {offsetX: 100}), inColor, outColor);
    drawCircle((color2 === 'red') ? 0.75 : 0.25, Object.assign(cueOpts, {offsetX: 100}));

  } else if (expStage === 'main1') {
    let inColor = (task1 === 'inner') ? 'black' : 'gray';
    let outColor = (task1 === 'inner') ? 'gray' : 'black';
    drawSandwich(stimElem[0], stimElem[1], Object.assign(stimOpts, {offsetX: -100}), inColor, outColor);
    drawCircle((color1 === 'red') ? 0.9 : 0.1, Object.assign(cueOpts, {offsetX: -100}));

    inColor = (task2 === 'inner') ? 'black' : 'gray';
    outColor = (task2 === 'inner') ? 'gray' : 'black';
    drawSandwich(stimElem[0], stimElem[1], Object.assign(stimOpts, {offsetX: 100}), inColor, outColor);
    drawCircle((color2 === 'red') ? 0.6 : 0.4, Object.assign(cueOpts, {offsetX: 100}));
  }
}