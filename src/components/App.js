import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import Level from './Level';
import Counter from './Counter';
import Timer from './Timer';
import Reset from './Reset';
import { initializeGame } from '../actions';
import * as constants from '../constants';

class App extends Component {

  componentWillMount() {
    this.props.initializeGame();
  }

  render() {
    return (
      <div className="flex-col">
        <div className="flex-col">
          <div className="info">
            <Counter />
            <Reset />
            <Timer />  
          </div>
          <Board />
          <div className="levels">
            <Level level={constants.BEGINNER}/>
            <Level level={constants.INTERMEDIATE}/>
            <Level level={constants.EXPERT}/>  
          </div> 
        </div>
      </div>  
    )
  }
}

export default connect(null, { initializeGame })(App);
