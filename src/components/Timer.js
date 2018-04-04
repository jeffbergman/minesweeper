import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ON, OFF, WON, LOST } from '../constants';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerId: null,
      time: 0
    };
  }

  startClock() {
    var timerID = setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
    this.setState({ timerID: timerID });
  }

  stopClock() {
    clearInterval(this.state.timerID);
    this.setState({ timerID: null });
  }

  resetClock() {
    clearInterval(this.state.timerID);
    this.setState({ time: 0, timerID: null });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playState === nextProps.playState) {
      return;
    }

    switch (nextProps.playState) {
      case OFF:
        this.resetClock();
        break;
      case ON:
        this.startClock();
        break;
      case WON:
      case LOST:
      default:
        this.stopClock();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);
  }

	render() {
  	
    return (
    	<div className="flex-col">
    		<div>Time</div>
    		<div className="counter">
	      	{this.state.time}	  
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

export default connect(mapStateToProps)(Timer);