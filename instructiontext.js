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
  var blockTime = Math.ceil(trialsPerBlock * (fixInterval + stimInterval + ITIInterval) / (1000 * 60));
  var beginText = " Please place your hands on the '" + respL + "' and '" + respR + "' keys as shown.</p>" +
   "<img src=images/handsOnKeyboard6.png>" +  "<p><b>Press any button to begin</b>.</p>";

  var instructionText = {
    'prac1-1': [
      "<p style='font-size:50px;'>" + stimElem[0] + '\n' + stimElem[1] + '\n' + stimElem[1] + '\n' + stimElem[0] + "</p>" +
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
      "</b> arrows, depending on the color of the circle surrounding them.</p>",

      "<p>However, the circle will contain segments of both " + color1 + " and " + color2 +
      ". Choose your response based on which color the circle contains more of.",

      "<p>If the circle is more " + color1 + ", indicate the direction of the <b>" + task1 + "</b> arrows.</p>",

      "<p>If the circle is more " + color2 + ", indicate the direction of the <b>" + task2 + "</b> arrows.</p>",

      "<p>As before, press '" + respL + "' if the relevant arrows are pointing " + dirL + " and " + respR +
      ", and '" + respR + "' if the relevant arrows are pointing " + dirR + ".</p>",

      "<p>This block contains " + (numPracticeTrials * 2) + " trials." + beginText
    ], 

    'main1': [
      "<p>Great job! You are now ready to begin the main experiment.</p>",

      "<p>This experiment consists of " + numBlocks +" blocks, with each block lasting about " 
      + blockTime + "minutes.</p>",

      "<p>Each block will be similar to the practice task you just completed. " + 
      "\n However, in each block the balance of colors in the circle will be different.",

      "For example, in one block the circle might be nearly all one color, " + 
      "while in another block \n the amounts of " + color1 + " and " + color2 + " might be more balanced.</p>",

      "As before, respond to the <b>" + task1 + "</b> arrows if the the circle is more " + color1 +
      ",\n and to the <b>" + task2 + "</b> arrows if the circle is more " + color2 + ".",

      "<p>Try to respond as quickly and as accuractely as possible on each trial," + 
      "and to maintain at least 75% accuracy throughout the task." + '\n' +
      "We will let you know how you are doing at each break.</p>"
    ]
  };

  return instructionText;
}
//     case "prac3":
//     switch (slideNum){
//       case 1:
//       return ;
//       case 2:
//       return 
//       case 3:
//       return  ;
//       case 3:
//       return  ;
//       case 4:
//       return ;
//       case 5:
//       iterateAgain = true;
//       return ;              
//     }
//     case "main1":
//     switch (slideNum){
//       case 1:
//       return ;
//       // case 2:
//       // return ";
//       case 2:
//         var canv = document.createElement('canvas'); // creates new canvas element
//         canv.id = 'canvasdummy'; // gives canvas id
//         canv.height = 200; //get original canvas height
//         canv.width = 200; // get original canvas width
//         canv.style = 'border:1px solid grey';
        
//         document.getElementsByClassName('instruction-body')[0].appendChild(canv)
//         var d = canv.getContext("2d");
//         d.fillRect(20, 20, 150, 100);

//         // document.body.appendChild(canv); // adds the canvas to the body element
//       return "<p>is there a canvas above me?";

//       // drawCircle(0.8, document.getElementById('main1-3').getContext('2d'), {lineWidth: 8, numSegments: 10, radius: 75});
//       // return "
//       // case 5: 
//       // return "<p>In another block, the colors might be more evenly balanced, as in the example below:</p>"
//       // case 6:
//       // return ;
//       // case 7:
//       // return "<p>Please try to maintain at least 75% accuracy throughout the task. We will let you know how you are doing at each break.</p>";
//     }
//     case "main2":
//     switch (slideNum){
//       case 1:
//       $( getImageText(instructionImages[get_task_image(1)]) ).insertBefore( "#instructions" + slideNum);
//       return "Remember, if the rectangle is " + colorFirstTask() + ", indicate if the number is " + first_task() + " using the 'Z' and 'M' keys, respectively." ;
//       case 2:
//       $( getImageText(instructionImages[get_task_image(2)]) ).insertBefore( "#instructions" + slideNum);
//       return "If the rectangle is " + colorSecondTask() + ", indicate if the number is " + second_task() + " using the 'Z' and 'M' keys, respectively." ;
//       case 3:
//       iterateAgain = true;
//       $( getImageText(instructionImages[1])).insertAfter( "#instructions" + slideNum);
//       return "Please place your hands on the 'Z' and 'M' keys as shown.";
//       case 4:
//       changeTextFormat('#instructions' + slideNum,'font-weight','bold');
//       return "Press any button to begin.";
//     }
//   }
// };