function drawRect(opts){
    // set size of rectangle
    let frameWidth = opts.width;
    let frameHeight = opts.width;
    let thisTaskColor = colorValues.taskColor[taskArr[trialCount]];
    
    // draw box
    ctx.beginPath();
    ctx.lineWidth = opts.lineWidth;
    // ctx.strokeStyle = (taskArr[trialCount] == "m") ? magnitudeColor : parityColor;
    ctx.strokeStyle = colorValues[thisTaskColor];
    ctx.rect((canvas.width/2) - (frameWidth/2), (canvas.height/2) - (frameHeight/2) - 5, frameWidth, frameHeight);
    ctx.stroke();
}

function drawSolid(propRed, opts) {
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var startAngle = 2 * Math.PI * Math.random();
    var partLen = 2 * Math.PI / opts.numSegments;
    ctx.lineWidth = opts.lineWidth;    

    for (var i = 0; i < opts.numSegments; i++) {
        ctx.strokeStyle = colorValues.red;
        endAngle = startAngle + partLen * propRed;
        if (endAngle > 2 * Math.PI) endAngle += -2 * Math.PI;
        ctx.beginPath();
        ctx.arc(centerX, centerY, opts.radius, startAngle, endAngle);
        ctx.stroke();
        startAngle = endAngle;
        
        ctx.strokeStyle = colorValues.blue;
        endAngle = startAngle + partLen * (1-propRed);
        if (endAngle > 2 * Math.PI) endAngle += -2 * Math.PI;
        ctx.beginPath();
        ctx.arc(centerX, centerY, opts.radius, startAngle, endAngle);
        ctx.stroke();
        startAngle = endAngle;
    }
}

function drawFlanker(middle, flanker, opts) {
    // var flank = "\u2191"
    // var center = "\u2193"
    // var opts.gapPerFnt = 0.4;
    // var opts.fnt = 100;
    // var gap = fnt * gapPerFnt;
    
    // draw number on canvas
    ctx.font = opts.fontSize + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(flanker, canvas.width/2 + opts.gap * 1.5, canvas.height/2);
    ctx.fillText(middle, canvas.width/2 + opts.gap * 0.5, canvas.height/2);
    ctx.fillText(middle, canvas.width/2 - opts.gap * 0.5, canvas.height/2);
    ctx.fillText(flanker, canvas.width/2 - opts.gap * 1.5, canvas.height/2);
  }

  function drawSandwich(middle, flanker, opts) {
    // var flank = "\u2190"
    // var central = "\u2192"
    
    // draw number on canvas
    ctx.font = opts.fontSize + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(flanker, canvas.width/2, canvas.height/2 + opts.gap * 1.5);
    ctx.fillText(middle, canvas.width/2, canvas.height/2 + opts.gap * 0.5);
    ctx.fillText(middle, canvas.width/2, canvas.height/2 - opts.gap * 0.5);
    ctx.fillText(flanker, canvas.width/2, canvas.height/2 - opts.gap * 1.5);
  }


function drawRing(densDots, radius, dotSize, prob) {
    // Set the center of the canvas
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    
    // Calculate the number of dots
    var numDots = densDots * radius/100;
    var dotsLeft = numDots;
    
    // Determine the number of red dots
    var numRedDots = Math.round(numDots * prob);
    var redDotsLeft = numRedDots;
    
    // Draw the dots
    for (var i = 0; i < numDots; i++) {
        var angle = (i / numDots) * 2 * Math.PI;
        var x = centerX + radius * Math.cos(angle);
        var y = centerY + radius * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
        
        // Randomly choose the color of the dot
        if (Math.random() < redDotsLeft/dotsLeft) {
            ctx.fillStyle = colorValues.red;
            redDotsLeft--;
            dotsLeft--;
        } else {
            ctx.fillStyle = colorValues.blue;
            dotsLeft--;
        }
        
        ctx.fill();
    }
}

function drawRingSet(){
    let isThisTaskRed = taskColor[taskArr[trialCount]] == "red";
    let propRed = isThisTaskRed ? cueArr[trialCount] : 1-cueArr[trialCount];
    drawRing(50, 130, 5, propRed);
    drawRing(50, 142, 5, propRed);
    drawRing(50, 118, 5, propRed);
}

function drawStimulus(){
    let number = stimArr[trialCount];
  
    ctx.fillStyle = "black";
    ctx.font = "bold 100px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(number,canvas.width/2,canvas.height/2);
  }
  