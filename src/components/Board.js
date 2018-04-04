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

/*
	componentDidCatch(error, info) {
    console.log('Board - componentDidCatch');
    console.log(error);
    console.log(info);
  }

  componentWillReceiveProps(nextProps) {
  	console.log('Board - componentWillReceiveProps');
    console.log(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
  	console.log('Board - shouldComponentUpdate');
    console.log(nextProps);
    console.log(nextState);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
  	console.log('Board - componentWillUpdate');
    console.log(nextProps);
    console.log(nextState);	
  }

*/
  componentDidUpdate(prevProps, prevState) {
  	console.log(`Board - componentDidUpdate: ${Date()}`);
    console.log(prevProps);
    console.log(prevState);	
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