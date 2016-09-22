/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution; //a matrix
  
  //create recursion function (it should take the current situation, and the rowIndex, which it's going to work on )
  var findSolution = function(row) {
    //iterator over one specific row
    for (var i = 0; i < n; i++) {
      //toggle the current position we are working on
      matrix.togglePiece(row, i);

      //if we are working on the final row
      if (row === n - 1) {
        //test whether we pass the conflicts detection
        if (!matrix.hasAnyRooksConflicts()) {
          console.log(JSON.stringify(matrix.rows()));
          return true; 
        }
      } else {
        //call next row, if next row return true
        if (findSolution(row + 1) ) {
          //if next row pass, return true
          return true;
        }
      }
      //toggle the current position we are working on back
      matrix.togglePiece(row, i);
    }      
  };

  //create a new board
  var matrix = new Board({n: n});

  //pass (0) into the recursion function;
  findSolution(0);


  solution = matrix.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
