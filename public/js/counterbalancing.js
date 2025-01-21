const getBlockOrder = (blockNames, blockReps) => shuffle(repeat(blockNames, blockReps));

function duplicateAndShuffle(X, N) {
  if (N <= 0) {
      throw new Error("N must be a positive integer");
  }
  if (X.length === 0) {
      throw new Error("Input array X cannot be empty");
  }
  if (X.length === 1) {
      return Array(N).fill(X[0]);
  }
  
  const result = [];
  let lastElement = null;
  
  for (let i = 0; i < N; i++) {
      let shuffled;
      if (lastElement === null) {
          // First copy can be shuffled normally
          shuffled = shuffle(X);
      } else {
          // Keep shuffling until we get a valid first element
          do {
              shuffled = shuffle(X);
          } while (shuffled[0] === lastElement);
      }
      
      result.push(...shuffled);
      lastElement = shuffled[shuffled.length - 1];
  }
  
  return result;
}

function getBlockParameters(blockLetter) {
  var thisBlock = {
    switchProp: (typeof(switchPropByBlock) === 'number') ? switchPropByBlock : switchPropByBlock[blockLetter],
    incProp: (typeof(incPropByBlock) === 'number') ? incPropByBlock : incPropByBlock[blockLetter],
    cueDiff: (typeof(cueDiffByBlock) === 'number') ? cueDiffByBlock : cueDiffByBlock[blockLetter],
    stimDiff: (typeof(stimDiffByBlock) === 'number') ? stimDiffByBlock : stimDiffByBlock[blockLetter],
  };
  
  return thisBlock;
}

function randElemVecFixed(stimType, propA, propB) {
  function getElemCount(s) {
    let prop = (s.at(0) == stimType.at(0) ? propA : 1-propA) * (s.at(1) === stimType.at(1) ? propB : 1-propB);
    return Math.round(prop * stimOpts.nRow * stimOpts.nCol);
  }
  
  let elementCounts = stimSet.map(getElemCount);
  let elementSet = repeatEach(stimSet, elementCounts);
  return shuffle(elementSet).slice(0, stimOpts.nRow * stimOpts.nCol);
} 

function randElemVec(stimType, propA, propB) {
  function getDimSets(s, sSet, majorProp) {
    let majorCount = Math.round(total * majorProp);
    let minorCount = total - majorCount;
    return shuffle(sSet.flatMap(item => Array(item===s ? majorCount : minorCount).fill(item)));
  }

  let total = stimOpts.nRow * stimOpts.nCol;
  let A = getDimSets(stimType.at(0), Object.keys(singleTaskMap.taskA), propA);
  let B = getDimSets(stimType.at(1), Object.keys(singleTaskMap.taskB), propB);
  return A.map( (s, index) => s + B[index]);
}