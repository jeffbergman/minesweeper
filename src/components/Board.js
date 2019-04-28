import React from 'react';
import { connect } from 'react-redux';
import Square from './Square';

class Board extends React.Component {
	
	renderRow(row, rowIndex) {
		return (
			<tr key={`row-${rowIndex}`}>
	      {row.map((col, colIndex) => this.renderSquare(col, colIndex))}
	    </tr>
		);
		
	}

	renderSquare(square, colIndex) {
		return (
			<Square key={`col-${colIndex}`} square={square} />
		);
    
	}

	render() {
		return (
    
    	<table className="board">
        <tbody>
          {this.props.board.map((row, rowIndex) => this.renderRow(row, rowIndex))}
        </tbody>
      </table>
    
  	);	
	}
  
}

const mapStateToProps = (state) => {
	return {
  	board: state.board
  };
};

export default connect(mapStateToProps)(Board);