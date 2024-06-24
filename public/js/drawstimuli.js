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
    ctx.rect((ctx.canvas.width/2) - (frameWidth/2), (ctx.canvas.height/2) - (frameHeight/2) - 5, frameWidth, frameHeight);
    ctx.stroke();
}

function drawCircle(propRed, opts) {
    offsetX = (opts.offsetX === undefined) ? 0 : opts.offsetX;
    offsetY = (opts.offsetY === undefined) ? 0 : opts.offsetY;
    var centerX = ctx.canvas.width / 2 + offsetX;
    var centerY = ctx.canvas.height / 2 + offsetY; 
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

function drawFlanker(inner, outer, opts, inColor="black", outColor="black") {
    // var flank = "\u2191"
    // var center = "\u2193"
    // var opts.gapPerFnt = 0.4;
    // var opts.fnt = 100;
    // var gap = fnt * gapPerFnt;
    
    // draw number on canvas
    ctx.font = opts.fontSize + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = outColor;
    ctx.fillText(outer, ctx.canvas.width/2 + opts.gap * 1.5, ctx.canvas.height/2);
    ctx.fillText(outer, ctx.canvas.width/2 - opts.gap * 1.5, ctx.canvas.height/2);

    ctx.fillStyle = inColor;
    ctx.fillText(inner, ctx.canvas.width/2 + opts.gap * 0.5, ctx.canvas.height/2);
    ctx.fillText(inner, ctx.canvas.width/2 - opts.gap * 0.5, ctx.canvas.height/2);
  }

  function drawSandwich(inner, outer, opts, inColor="black", outColor="black") {
    // var flank = "\u2190"
    // var central = "\u2192"

    let offsetX = (opts.offsetX === undefined) ? 0 : opts.offsetX;
    let offsetY = (opts.offsetY === undefined) ? 0 : opts.offsetY;
    let centerX = ctx.canvas.width / 2 + offsetX;
    let centerY = ctx.canvas.height / 2 + offsetY; 

    ctx.font = opts.fontSize + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = outColor;
    ctx.fillText(outer, centerX, centerY + opts.gap * 1.5);
    ctx.fillText(outer, centerX, centerY - opts.gap * 1.5);
    
    ctx.fillStyle = inColor;
    ctx.fillText(inner, centerX, centerY + opts.gap * 0.5);
    ctx.fillText(inner, centerX, centerY - opts.gap * 0.5);
  }


function drawDotRing(probRed, opts) {
    // Set the center of the canvas
    var centerX = ctx.canvas.width / 2;
    var centerY = ctx.canvas.height / 2;
    
    // Calculate the number of dots
    var numDots = opts.densDots * opts.radius/100;
    var dotsLeft = numDots;
    
    // Determine the number of red dots
    var numRedDots = Math.round(numDots * probRed);
    var redDotsLeft = numRedDots;
    
    // Draw the dots
    for (var i = 0; i < numDots; i++) {
        var angle = (i / numDots) * 2 * Math.PI;
        var x = centerX + opts.radius * Math.cos(angle);
        var y = centerY + opts.radius * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, opts.dotSize, 0, 2 * Math.PI);
        
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
    ctx.fillText(number, ctx.canvas.width/2, ctx.canvas.height/2);
  }
  
  function drawColoredShapeGrid(stims, stimCounts) {
    //stim = [shape, color]
    // Grid configuration
    const cellSize = canvas.width / gridSize;
    stimGrid = shuffle(repeatEach(stims, stimCounts));
    gridSize = Math.sqrt(stimGrid.length);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = opts.fontSize + "px Arial";
        
    // Draw grid and letters
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const x = col * cellSize;
        const y = row * cellSize;
                
        // Draw letter
        const index = row * gridSize + col;
        // const shape = stimGrid[index][0];
        // const color = stimGrid[index][1];
        
        ctx.fillText(shape, x + cellSize / 2, y + cellSize / 2);
      }
    }
  }