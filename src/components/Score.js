import React, { Component } from 'react';

class Score extends Component {
  
    render() {
      if (!this.props.visualizer) {
        return null;
      }
      
      return (
        <div>
          {this.props.headerBought === true ? <h3 className="header">Score</h3>: ''}
          <p>{this.props.score}</p>
        </div>);
    }
  }

export default Score;