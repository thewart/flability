function drawCircleCue(propRed, opts) {
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

function drawElementGrid(elements, opts) {
  const cellSize = opts.gridSize / opts.nRow;
  
  offsetX = (opts.offsetX === undefined) ? 0 : opts.offsetX;
  offsetY = (opts.offsetY === undefined) ? 0 : opts.offsetY;
  var x0 = (ctx.canvas.width - opts.gridSize)/2 + offsetX;
  var y0 = (ctx.canvas.height - opts.gridSize)/2 + offsetY;
  
  // Draw grid and letters
  for (let row = 0; row < opts.nRow; row++) {
    for (let col = 0; col < opts.nCol; col++) {
      const x = x0 + (col + 0.5) * cellSize;
      const y = y0 + (row + 0.5) * cellSize;
      
      // Draw letter
      const index = row * opts.nRow + col;
      
      drawElement(elements[index], x, y, opts.element);
    }
  }
}

function drawTriangle(centerX, centerY, area, stroke=true, fill=false) {
  // Calculate the side length of an equilateral triangle
  const sideLength = Math.sqrt((4 * area) / Math.sqrt(3));
  
  // Calculate the height of the triangle
  const height = (Math.sqrt(3) / 2) * sideLength;
  
  // Calculate the coordinates of the three vertices
  const topX = centerX;
  const topY = centerY - height / 2;
  const leftX = centerX - sideLength / 2;
  const leftY = centerY + height / 2;
  const rightX = centerX + sideLength / 2;
  const rightY = centerY + height / 2;
  
  // Draw the triangle
  ctx.beginPath();
  ctx.moveTo(topX, topY);
  ctx.lineTo(leftX, leftY);
  ctx.lineTo(rightX, rightY);
  ctx.closePath();
  
  // Fill the triangle
  if (stroke) ctx.stroke();
  if (fill) ctx.fill();
}

function drawCircle(centerX, centerY, area, stroke=true, fill=false) {
  // Calculate the radius from the area
  const radius = Math.sqrt(area / Math.PI);
  
  // Draw the circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);

  if (stroke) ctx.stroke();
  if (fill) ctx.fill();
}
