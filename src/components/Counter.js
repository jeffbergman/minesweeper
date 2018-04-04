import React, { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {

	render() {
  	const { minesRemaining } = this.props;
  	
    return (
    	<div className="flex-col">
    		<div>Mines</div>
    		<div className="counter">
	      	{minesRemaining}	  
	      </div>	
    	</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    minesRemaining: state.minesRemaining
  };
};

export default connect(mapStateToProps)(Counter);