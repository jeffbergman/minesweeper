import { initializeBoard, leftClick, updatePlayState, getDimensions } from '../helpers';
import * as constants from '../constants';

const initialState = {
  level: constants.BEGINNER, 
  minesRemaining: constants.BEGINNER_MINES,
  playState: constants.OFF,
  board: []            
};


const rootReducer = (state = initialState, action) => {
  
  let newBoard = [];
  let currBoard = [];
  let nbrMines;

  switch (action.type) {
    
    case constants.LEFT_CLICK:

      let { row, col } = action;
      
      //if the first click is a mine, reset the board
      if (state.board[row][col].isMine && state.playState === constants.OFF) {
        currBoard = initializeBoard(state.level, row, col);
      } else {
        currBoard = [...state.board];
      }

      //uncovers the squares
      newBoard = leftClick(currBoard, row, col);

      //update playState - it will be WON, LOST, or ON
      const playState = updatePlayState(newBoard, state.level);
      
      return {...state, board: newBoard, playState};
    
    case constants.RIGHT_CLICK:
      //Note: I'm not starting the timer with this, 
      //that's arguable wrong, but it's consistent with the instructions
      //according to a reasonable interpretation

      newBoard = [...state.board];
      let square = newBoard[action.row][action.col];
      let { minesRemaining } = state;
      
      if (square.displayState === constants.COVERED) {
        square.displayState = constants.FLAGGED;  
        minesRemaining--;
      } else {
        square.displayState = constants.COVERED;
        minesRemaining++;
      }

      return {...state, board: newBoard, minesRemaining};    
        
    case constants.INITIALIZE_GAME:
      
      newBoard = initializeBoard(state.level);
      nbrMines = getDimensions(state.level).nbrMines;
      return {...state, board: newBoard, playState: constants.OFF, minesRemaining: nbrMines};

    case constants.SET_LEVEL:

      nbrMines = getDimensions(action.level).nbrMines;
      return {...state, level: action.level, minesRemaining: nbrMines};

    default:
      return state;
  }
}


export default rootReducer;