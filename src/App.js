import React, { Component } from 'react';
import './App.css';
import ShopButton from './ShopButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {score: 0, timerBase: 1, timerInterval: 5000, clickBase: 1};
    this.increaseScore = this.increaseScore.bind(this);
    this.createShopButton = this.createShopButton.bind(this);
    this.buy = this.buy.bind(this);
  }

  createShopButton(upgrade) {
    return <ShopButton 
      key={upgrade.title} 
      title={upgrade.title} 
      buy={this.buy} 
      score={this.state.score} 
      bought={this.state[upgrade.title]} 
      cost={upgrade.cost} />
  }

  createShopButtons() {
    const upgrades = [
      {title:"visualizer", cost:"5"},
      {title:"timer",cost:"10"},
      {title:"improveClicks1",cost:"50"},
      {title:"scoreHeader",cost:"100"}
    ];
    return upgrades.map(this.createShopButton);
  }
  
  render() {
    return (
      <div className="App">
       <button name="incrementor" onClick={this.increaseScore}>Click Me</button>
       <div id="upgrades">
        {this.createShopButtons()}
      </div>
       <Score visualizer={this.state.visualizer} score={this.state.score} headerBought={this.state.scoreHeader}/>
      </div>
    );
  }

  buy(cost, upgrade) {
    let state = {score : this.state.score - cost};
    state[upgrade] = true;

    if (upgrade === "timer") {
      this.timerOn();
    }

    if (upgrade === "improveClicks1") {
      this.setState({clickBase: 2})
    }

    this.setState (state);
  }

  increaseScore(e) {
    e.preventDefault();
    this.setState ({score : this.state.score + this.state.clickBase});
  }

  timerOn() {
    setInterval(()=> {this.setState({score: this.state.score + this.state.timerBase})},this.state.timerInterval); 
  }

}

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

export default App;
