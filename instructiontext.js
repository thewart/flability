function getNextInstructions(slideNum, expStage){
  /* use the following options when modifying text appearance
  -  iterateAgain = true;
  -  changeTextFormat('#instructions' + slideNum,'font-weight','bold');
  -  changeTextFormat('#instructions' + slideNum,'font-size','60px');
  -  changeTextFormat('#instructions' + slideNum,'color','red');
  -  changeTextFormat('#instructions' + slideNum,'margin-top', '20px');
  -  changeTextFormat('#instructions' + slideNum,'margin-bottom', '20px');
  - $("<img src='../pics/finalpics/M33.jpg' class='insertedImage'>").insertAfter( "#instructions" + slideNum);
  */
  var task1 = taskName[pracOrder[0]];
  var task2 = taskName[pracOrder[1]];
  var color1 = taskColor[task1];
  var color2 = taskColor[task2];
  var dirL = (respL === respUp ? "up" : "down");
  var dirR = (respR === respUp ? "up" : "down");
  var blockTime = Math.ceil(trialsPerBlock * (fixInterval + stimInterval + ITIInterval) / (1000 * 60));
  
  switch (expStage){
    case "prac1-1":
    switch (slideNum){
      case 1:
      // $( getImageText(instructionImages[2]) ).insertAfter( "#instructions" + slideNum);
      return "<p style='font-size:50px;'>" + stimElem[0] + stimElem[1] + stimElem[1] + stimElem[0] + "</p>" +
      "<p>In this task, you will see a a set of four arrows, such as those above, in the middle of the screen." + "\n" + 
      "You will need to identify the arrows as either pointing up or poiting down.</p>";
      case 2:
      return "<p>On some trials you will need to identify the central two arrows," + "\n" +
      "while on other trials, you will need to identify the two arrows on the sides.</p>";
      case 3:
      return "<p>On each trial, a colored circle surrounding the arrows will indicate" + "\n" + 
      "whether you should respond to the central or side arrows.</p>";
      case 4:
      return "You will begin with a few practice blocks to familiarize you with the task before beginning the main experiment. You will need to get at least " + practiceAccCutoff + "% correct on each practice block before you can move on to the next one.";
    }
    case "prac1-2":
    switch (slideNum){
      case 1:
      return "<p>In the first practice task, you will indicate whether the <b>" + task1 + "</b> arrows are pointing up or down.</p>";
      case 2:
      return "<p>Press '" + respL + "' with your left hand index finger if the <b>" + task1 + "</b> arrows are pointing " + dirL + ".</p>";
      case 3:
      return "<p>Press '" + respR + "' with your right hand index finger if the <b>" + task1 + "</b> arrows are pointing " + dirR + ". </p>";
      case 4:
      iterateAgain = true;
      return "<p>This block contains " + numPracticeTrials + " trials. Please place your hands on the '" + respL + "' and '" + respR + "' keys as shown.</p>" + 
      "<img src=images/handsOnKeyboard6.png>";              
    }
    case "prac2":
    // task = 2;
    switch (slideNum){
      case 1:
      return "<p>In the second practice task, you will indicate whether the <b>" + task2 + "</b> arrows are pointing up or down.</p>";
      case 2:
      return "<p>Press '" + respL + "' with your left hand index finger if the <b>" + task2 + "</b> arrows are pointing " + dirL + ".</p>";
      case 3:
      return "<p>Press '" + respR + "' with your right hand index finger if the <b>" + task2 + "</b> arrows are pointing " + dirR + ". </p>";
      case 4:
      iterateAgain = true;
      return "<p>This block contains " + numPracticeTrials + " trials. Please place your hands on the '" + respL + "' and '" + respR + "' keys as shown.</p>" + 
      "<img src=images/handsOnKeyboard6.png>";              
    }
    case "prac3":
    switch (slideNum){
      case 1:
      return "<p>In this last practice task, you will either respond to the <b>" + task1 + "</b> or <b>" + task2 + "</b> arrows, depending on the color of the circle surrounding them.</p>";
      case 2:
      return "<p>However, from now on the circle will usually contain segments of both " + color1 + " and " + color2 + " . Choose your response based on which color there is more of."
      case 3:
      return "<p>If the circle is more " + color1 + ", indicate the direction of the <b>" + task1 + "</b> arrows.</p>" ;
      case 3:
      return "<p>If the circle is more " + color2 + ", indicate the direction of the <b>" + task2 + "</b> arrows.</p>" ;
      case 4:
      return "<p>As before, press '" + respL + "' if the relevant arrows are pointing " + dirL + " and " + respR +
      ", and '" + respR + "' if the relevant arrows are pointing " + dirR + ".</p>";
      case 5:
      iterateAgain = true;
      return "<p>This block contains " + (numPracticeTrials * 2)+" trials. Please once again place your hands on the '" + respL + "' and '" + respR + "' keys as shown.</p>" +
      "<img src=images/handsOnKeyboard6.png>";              
    }
    case "main1":
    switch (slideNum){
      case 1:
      return "<p>Great job! You are now ready to begin the main experiment.</p>";
      case 2:
      return "<p>This experiment consists of " + numBlocks + " blocks, with each block lasting about " + blockTime + ".</p>";
      case 3:
      return"<p>Each block will be similar to the practice task you just completed. However, in each block the balance of colors in the circle will be different." + '\n' +
      "For example, in one block the circle might be nearly all one color, while in another block the colors might be more balanced: as in the examples below:</p>" + 
      "<canvas id='main1-3' height='100'</canvas>"
      case 5: 
      return "<p>In another block, the colors might be more evenly balanced, as in the example below:</p>"
      case 6:
      return "<p>Try to respond as quickly and as accuractely as possible on each trial.</p>";
      case 7:
      return "<p>Please try to maintain at least 75% accuracy throughout the task. We will let you know how you are doing at each break.</p>";
    }
    case "main2":
    switch (slideNum){
      case 1:
      $( getImageText(instructionImages[get_task_image(1)]) ).insertBefore( "#instructions" + slideNum);
      return "Remember, if the rectangle is " + colorFirstTask() + ", indicate if the number is " + first_task() + " using the 'Z' and 'M' keys, respectively." ;
      case 2:
      $( getImageText(instructionImages[get_task_image(2)]) ).insertBefore( "#instructions" + slideNum);
      return "If the rectangle is " + colorSecondTask() + ", indicate if the number is " + second_task() + " using the 'Z' and 'M' keys, respectively." ;
      case 3:
      iterateAgain = true;
      $( getImageText(instructionImages[1])).insertAfter( "#instructions" + slideNum);
      return "Please place your hands on the 'Z' and 'M' keys as shown.";
      case 4:
      changeTextFormat('#instructions' + slideNum,'font-weight','bold');
      return "Press any button to begin.";
    }
  }
};