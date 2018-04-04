import React from 'react';
import { connect } from 'react-redux';
import { leftClick, rightClick } from '../actions';
import {
  FLAGGED, 
  COVERED,
  UNCOVERED,
  LOSE_MINE
} from '../constants'


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
  }

  handleRightClick(evt) {
    evt.preventDefault();
    const { row, col, displayState } = this.props.square;
    
    //don't call the action on uncovered squares
    if (displayState === UNCOVERED) return;
      
    //flags or unflags the square
    this.props.rightClick(row, col); 
  }

  handleLeftClick(evt) {
    evt.preventDefault();
    const { row, col, displayState } = this.props.square;

    //only call it on covered squares
    if (displayState !== COVERED) return;

    this.props.leftClick(row, col);
  }

  
  render() {
    let className = '';
    let displayValue = '';
    
    const {
      displayState,
      adjacentMines,
      isMine
    } = this.props.square;

    if (isMine) {
      displayValue = 'M';
    } else {
      displayValue = adjacentMines;
    }

    switch (displayState) {
      case FLAGGED:
        className = 'covered flagged';
        displayValue = 'F';
        break;
      case COVERED:
        className = 'covered';
        break;
      case UNCOVERED:
        className = 'uncovered';
        break;
      case LOSE_MINE:
        className = 'lose-mine';
        break;
      default:
        className = 'covered';
        console.log('Component Cell unknown state');
        break;
    }

    return (
      <td className={className} onClick={this.handleLeftClick} onContextMenu={this.handleRightClick}> 
        {displayValue}
      </td>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    ownProps,
    uncoveredSquares: state.uncoveredSquares
  };
};

export default connect(mapStateToProps, { leftClick, rightClick })(Square);