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
  // var solution; //a matrix
  
  // //create recursion function (it should take the current situation, and the rowIndex, which it's going to work on )
  // var findSolution = function(row) {
  //   //iterator over one specific row
  //   for (var i = 0; i < n; i++) {
  //     //toggle the current position we are working on
  //     matrix.togglePiece(row, i);

  //     //if we are working on the final row
  //     if (row === n - 1) {
  //       //test whether we pass the conflicts detection
  //       if (!matrix.hasAnyRooksConflicts()) {
  //         //console.log(JSON.stringify(matrix.rows()));
  //         return true; 
  //       }
  //     } else {
  //       //call next row, if next row return true
  //       if (findSolution(row + 1) ) {
  //         //if next row pass, return true
  //         return true;
  //       }
  //     }
  //     //toggle the current position we are working on back
  //     matrix.togglePiece(row, i);
  //   }      
  // };

  // //create a new board
  // var matrix = new Board({n: n});

  // //pass (0) into the recursion function;
  // findSolution(0);


  // solution = matrix.rows();
  // //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution; 
  // time used: 0.7s

  var solution;
  
  //create a new board
  var matrix = new Board({n: n});
  //create a marker array
  var maker = _.range(0, n).map(function(num) { return 0; });

  //major function to do the recursion
  var findSolution = function(row) {
    //if(it is the first row, go through half of the row) or else go through or the possible solutions
    for (var i = 0; i < ((row === 0) ? Math.ceil(n / 2) : n); i++) {
      if (!maker[i]) {
        //toggle the board(only toggle the possible places);
        matrix.togglePiece(row, i);
        //toggole the marker array;
        maker[i] = 1;
        //check whether it is the last row
        if (row === n - 1) { 
          //if yes, do the test
          if (!matrix.hasAnyRooksConflicts()) {
            //if test passes, return true;
            return true;
          }
          //else 
        } else {
            //do test of recursion on the next row;
          if (findSolution(row + 1)) {
              // if test passes, return true;
            return true;
          }
        }

        //toggle the board;
        matrix.togglePiece(row, i);
        //toggle the marker array;
        maker[i] = 0;
      }
    }
  };


  //call findsolution on row 0
  findSolution(0);
  //pass the result to solution
  solution = matrix.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
  //42ms
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = 0; //set to 0
  // //recursive function with row number parameter
  // var findSolution = function(row) {
  //   //iterate over current row
  //   for (var i = 0; i < n; i++) {
  //   //toggle current bucket to a 1 (rook)
  //     matrix.togglePiece(row, i);
  //   //kill test: working on final row?
  //     if (row === n - 1) {
  //     //if yes, test whether board passes rooks tests
  //       if (!matrix.hasAnyRooksConflicts()) {
  //       //add one to counter if it does
  //         solutionCount++;
  //       }
  //     } else {
  //     //if no, recurse over next row
  //       findSolution(row + 1);
  //     }
  //   //toggle current bucket back to a 0
  //     matrix.togglePiece(row, i);
  //   }
  // };

  // //build n x n matrix with only zeros
  // var matrix = new Board({n: n});
  // //call recursive function at row 0 of matrix
  // findSolution(0);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
  // time used: 166 seconds

  var solutionCount = 0;
  var matrix = new Board({n: n});
  var maker = _.range(0, n).map(function(num) { return 0; });
  var solutionArray = _.range(0, n).map(function(num) { return 0; });

  var findSolution = function(row) {
    for (var i = 0; i < ((row === 0) ? Math.ceil(n / 2) : n); i++) {
      if (!maker[i]) {
        matrix.togglePiece(row, i);
        maker[i] = 1;

        if (row === n - 1) { 
          if (!matrix.hasAnyRooksConflicts()) {
            //get the first row of the board
            solutionCount++;
            var firstRow = matrix.get(0);
            //find out the index of the 1
            var index = _.indexOf(firstRow, 1);
            //solution[index]++
            solutionArray[index]++;
          }
        } else {
          findSolution(row + 1);
        }

        matrix.togglePiece(row, i);
        maker[i] = 0;
      }
    }
  };

  findSolution(0);
  for (var i = 0; i < n / 2; i++) {
    solutionArray[n - 1 - i] = solutionArray[i];
  }
  solutionCount = _.reduce(solutionArray, function(sum, num) { return sum + num; });
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
  //time used: 152ms
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;

  var findSolution = function(row) {
    for (var i = 0; i < n; i++) {
      matrix.togglePiece(row, i);

      if (row === n - 1) {
        if (!matrix.hasAnyQueensConflicts()) {
          return true;
        }
      } else {
        if (findSolution(row + 1)) {
          return true;
        }
      }

      matrix.togglePiece(row, i);
    }
  };

  var matrix = new Board({n: n});
  findSolution(0);

  solution = matrix.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
  // time used: 3 seconds
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  var findSolution = function(row) {
    for (var i = 0; i < n; i++) {
      matrix.togglePiece(row, i);

      if (row === n - 1) {
        if (!matrix.hasAnyQueensConflicts()) {
          solutionCount++;
        }
      } else {
        findSolution(row + 1);
      }

      matrix.togglePiece(row, i);
    }
  };

  var matrix = new Board({n: n});
  findSolution(0);

  if (n === 0) {
    solutionCount++;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
  // time used 48 seconds
};
