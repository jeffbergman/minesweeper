import * as constants from './constants';

export const titleCase = str => {
  if (!str) return str;
  return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

export function getDimensions(level) {
  //set nbr of rows, cols, and mines based on difficulty

  let nbrRows = 0;
  let nbrCols = 0;
  let nbrMines = 0;

  switch (level) {
    case constants.BEGINNER:
      nbrRows = constants.BEGINNER_ROWS;
      nbrCols = constants.BEGINNER_COLS;
      nbrMines = constants.BEGINNER_MINES;
      break;
    case constants.INTERMEDIATE:
      nbrRows = constants.INTERMEDIATE_ROWS;
      nbrCols = constants.INTERMEDIATE_COLS;
      nbrMines = constants.INTERMEDIATE_MINES;
      break;
    case constants.EXPERT:
      nbrRows = constants.EXPERT_ROWS;
      nbrCols = constants.EXPERT_COLS;
      nbrMines = constants.EXPERT_MINES;
      break;
    default:
      nbrRows = constants.BEGINNER_ROWS;
      nbrCols = constants.BEGINNER_COLS;
      nbrMines = constants.BEGINNER_MINES;
      console.log('initializeBoard - unknown difficulty level');
      break;
  }

  return { nbrRows, nbrCols, nbrMines };
}

export function initializeBoard(level, exclRow = -1, exclCol = -1) {
  //returns a new, mined board of the proper size
  //and resets the game state

  const board = [];
  const { nbrRows, nbrCols, nbrMines } = getDimensions(level);

  //initialize the squares in the board
  for (let row = 0; row < nbrRows; row++) {
    board.push([]);
    for (let col = 0; col < nbrCols; col++) {
      let sq = {
        isMine: false,
        displayState: constants.COVERED,  
        adjacentMines: null,
        row: row,
        col: col
      } 
      board[row].push(sq);
    }
  }
  
  //set the mines
  const minedBoard = randomMines(nbrMines, board, exclRow, exclCol);

  //set the adjacent mine number values
  const numberedBoard = setAdjacentMines(minedBoard);

  //return minedBoard;
  return numberedBoard;

}

function randomMines(nbrMines, board, exclRow, exclCol) {
  //exclRow and exclCol are for when the first click is a mine
  //and the board has to be reinitialized.

  let ctr = 0;
  const rows = board.length - 1;
  const cols = board[0].length - 1;
  
  while (ctr < nbrMines) {
    let row = getRandomInt(rows);
    let col = getRandomInt(cols);
    
    //makes sure it's ok to mine
    let mineOK = okToMine(row, col, exclRow, exclCol);
    if (!board[row][col].isMine && mineOK) {
      board[row][col].isMine = true;
      ctr++;
    }
  }

  return board;
}

function okToMine(mineRow, mineCol, exclRow = -1, exclCol = -1) {
  // helper function, in case the first click is a mine
  //and the board has to be reinitialized.
  //exclRow and exclCol are the coords we can't mine

  if (mineRow === exclRow && mineCol === exclCol) {
    return false;
  }

  return true;
}

function setAdjacentMines(board) {
//traverses the board, sets the adjacent mine number values
//for every square 

  for (let row of board) {
    for (let square of row) {
      let nbrMines = countAdjacentMines(board, square);
      if (nbrMines > -1) {
        square.adjacentMines = nbrMines;  
      }
    }
  }

  return board;
}

function countAdjacentMines(board, square) {
  /* checks adjacent squares for mines (unless it itself is a mine)
    if the square is a mine, returns -1
    if the square is not a mine, returns the number of adjacent mines
  */

  if (square.isMine) return -1;
  
  //get and array of adjacent squares
  const adjacent = getAdjacentSquares(board, square);
  const adjacentMines = adjacent.reduce((nbrMines, currSquare) => {
    return currSquare.isMine ? nbrMines + 1 : nbrMines;
  }, 0)

  return adjacentMines;
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max); 
}

export function leftClick(board, row, col) {
  let newBoard = [];

  //mine, not first click - 
  if (board[row][col].isMine) {
    newBoard = uncoverMines(board);
    newBoard[row][col].displayState = constants.LOSE_MINE;
    return newBoard;
  }

  //non-mine square is clicked
  newBoard = revealSquares(board, [board[row][col]]);

  return newBoard;
}

function uncoverMines(board) {
  //if the player clicks a mine and loses, 
  //this uncovers all the mined squares
  for (let row of board) {
    for (let square of row) {
      if (square.isMine) {
        square.displayState = constants.UNCOVERED;  
      }
    }
  }

  return board;
}

function revealSquares(board, squareArray) {
  //recursive function to uncover squares on left click

  while(squareArray.length) {
    
    //pop off a new square
    const square = squareArray.pop();

    //uncover it
    square.displayState = constants.UNCOVERED;

    //if it has no adjacent mines
    if (square.adjacentMines === 0) {

      //get and array of adjacent squares
      const adjacent = getAdjacentSquares(board, square);

      //only check covered squares
      const covered = adjacent.filter(square => square.displayState === constants.COVERED);
      
      //recursive call with the array of adjacent covered squares
      revealSquares(board, covered);
    }
  }
  return board;
}

function getAdjacentSquares(board, square) {
  //returns an array of squares adjacent to the passed square

  const rows = board.length - 1;
  const cols = board[0].length - 1;
  const startRow = square.row;
  const startCol = square.col;
  const adjacent = [];

  for (let row = startRow - 1; row <= startRow + 1; row++) {
    for (let col = startCol - 1; col <= startCol + 1; col++) {
      
      //no out of bounds indices, and not the original square
      if (row >= 0 && row <= rows && col >= 0 && col <= cols &&
        !(row === startRow && col === startCol)) {
        adjacent.push(board[row][col]);
      }
    }
  }
  return adjacent;
}

export function updatePlayState(board, level) {
  //traverses the board, returns WON, LOST, or ON
  let nbrUncovered = 0;

  //get the mines for the level
  const { nbrRows, nbrCols, nbrMines } = getDimensions(level);

  for (let row of board) {
    for (let square of row) {
      
      //loser, no need to go on
      if (square.displayState === constants.LOSE_MINE) {
        return constants.LOST;  
      }

      if (square.displayState === constants.UNCOVERED) {
        nbrUncovered++   
      }
    }
  }

  //if all the non-mine squares have been uncovered
  if (nbrRows * nbrCols - nbrUncovered === nbrMines) {
    return constants.WON;
  }

  return constants.ON;
}
