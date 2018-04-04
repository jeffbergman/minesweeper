import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLevel, initializeGame } from '../actions';
import { titleCase } from '../helpers';

class Level extends Component {

	handleClick(evt) {
		evt.preventDefault();

		const { level } = this.props;
		this.props.setLevel(level);
		this.props.initializeGame();
	}

	render() {
  	const { level } = this.props;

    return (
      <div className="level" onClick={evt => this.handleClick(evt)}>
      	{titleCase(level)}  
      </div>
    )
  }
}

export default connect(null, { setLevel, initializeGame })(Level);