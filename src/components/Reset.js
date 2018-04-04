import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeGame } from '../actions';
import { ON, OFF, WON, LOST } from '../constants';

class Reset extends Component {

	handleClick(evt) {
		evt.preventDefault();
		this.props.initializeGame();
	}

	render() {
  	const { playState } = this.props;

  	let divClass = '';
  	let iconClass = '';

  	switch (playState) {
  		case WON:
  			divClass = 'reset won';
  			iconClass = 'fa fa-smile-o';
  			break;
  		case LOST:
  			divClass = 'reset lost';
  			iconClass = 'fa fa-frown-o';
  			break;
  		case ON:
  		case OFF:
  		default:
  			divClass = 'reset';
  			iconClass = 'fa fa-smile-o';
  			break;
  	}

  	return (
    	<div className="flex-col">
    		<div>Reset</div>
    		<div className={divClass}  onClick={evt => this.handleClick(evt)}>
	      	<i className={iconClass} ></i>	  
	      </div>	
    	</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playState: state.playState
  };
};

export default connect(mapStateToProps, { initializeGame })(Reset);