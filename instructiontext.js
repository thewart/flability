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
              return "You will begin with a few practice sections to familiarize you with the task before beginning the main experiment. You will need to get at least " + practiceAccCutoff + "% correct on each practice section before you can move on to the next one.";
          }
        case "prac1-2":
          switch (slideNum){
            case 1:
              // $( getImageText(instructionImages[get_task_image(1)]) ).insertAfter( "#instructions" + slideNum);
              return "<p>In the first practice task, you will indicate whether the " + taskName[pracOrder[0]] + " arrows are pointing up or down.</p>";
            case 2:
              return "<p>Press '" + respL + "' with your left hand index finger if the " + taskName[pracOrder[0]] + " arrows are pointing " + (respL === respUp ? "up" : "down") + ".</p>";
            case 3:
              return "<p>Press '" + respR + "' with your right hand index finger if the " + taskName[pracOrder[0]] + " arrows are pointing " + (respR === respUp ? "up" : "down") + ". </p>";
            case 4:
              // $( getImageText(instructionImages[1]) ).insertAfter( "#instructions" + slideNum);
              iterateAgain = true;
              return "<p>This block contains " + numPracticeTrials + " trials. Please place your hands on the '" + respL + "' and '" + respR + "' keys as shown.</p>";
            // case 5:
              // changeTextFormat('#instructions' + slideNum,'font-weight','bold');
              
          }
        case "prac2":
          // task = 2;
          switch (slideNum){
            case 1:
              $( getImageText(instructionImages[get_task_image(2)]) ).insertAfter( "#instructions" + slideNum);
              return "In the second practice task, you will indicate whether the number in the center of the screen is " + second_task() + ".";
            case 2:
              return "Press 'Z' with your left hand index finger if the number is " + task_instruction(2,1) + ".";
            case 3:
              return "Press 'M' with your right hand index finger if the number is " + task_instruction(2,2) + ".";
            case 4:
              $( getImageText(instructionImages[1]) ).insertAfter( "#instructions" + slideNum);
              iterateAgain = true;
              return "This block contains " + numPracticeTrials + " trials. Please place your hands on the 'Z' and 'M' keys as shown.";
            case 5:
              changeTextFormat('#instructions' + slideNum,'font-weight','bold');
              return "Press any button to begin.";
          }
        case "prac3":
          switch (slideNum){
            case 1:
              return "In this last practice task, you will either indicate if the number is " + first_task() + " or if the number is " + second_task() + ", based on the color of the rectangle surrounding the number.";
            case 2:
              $( getImageText(instructionImages[get_task_image(1)]) ).insertBefore( "#instructions" + slideNum);
              return "If the rectangle is " + colorFirstTask() + ", indicate if the number is " + first_task() + " using the 'Z' and 'M' keys, respectively." ;
            case 3:
              $( getImageText(instructionImages[get_task_image(2)]) ).insertBefore( "#instructions" + slideNum);
              return "If the rectangle is " + colorSecondTask() + ", indicate if the number is " + second_task() + " using the 'Z' and 'M' keys, respectively." ;
            case 4:
              iterateAgain = true;
              $( getImageText(instructionImages[1]) ).insertAfter( "#instructions" + slideNum);
              return "This block contains "+(numPracticeTrials * 2)+" trials. Please place your hands on the 'Z' and 'M' keys as shown.";
            case 5:
              changeTextFormat('#instructions' + slideNum,'font-weight','bold');
              return "Press any button to begin.";
          }
        case "main1":
          switch (slideNum){
            case 1:
              return "Great job! You are now ready to begin the main experiment.";
            case 2:
              return "Please try to maintain at least 75% accuracy throughout the task. We will let you know how you are doing at each break.";
            case 3:
              changeTextFormat('#instructions' + slideNum,'font-weight','bold');
              return "Remember to respond as quickly and as accuractely as possible on each trial.";
            case 4:
              return "This experiment consists of 4 sections, with each section lasting about 3 to 4 minutes.";
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