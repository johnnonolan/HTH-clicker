import React, { Component } from 'react';
import './App.css';
import ShopButton from './ShopButton';
import Score from './Score';
import CodeDisplay from './CodeDisplay';

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
      {title:"improveClicks1", cost:"50"},
      {title:"scoreHeader", cost:"100"},
      {title:"displayCode", cost:"30"},
      {title:"improveTimer1", cost:"50"},
      {title:"upgradesHeader", cost:"80"},
      {title:"someStyling1", cost:"80"}
    ];
    return upgrades.map(this.createShopButton);
  }
  
  render() {
    return (
      <div className="App">
         <div id="clicker">
          <h3>Clicker</h3>
          <button name="incrementor" onClick={this.increaseScore}>Click Me</button>
         </div>
         <div id="upgrades">
          {this.state.upgradesHeader === true ? <h3 className="header">Upgrades</h3>: ''}
          {this.createShopButtons()}
         </div>
         <div id="scores">
           <Score visualizer={this.state.visualizer} score={this.state.score} headerBought={this.state.scoreHeader}/>
           <CodeDisplay 
            displayCode={this.state.displayCode} 
            clickBase={this.state.clickBase} 
            timerBase={this.state.timerBase} 
            timerInterval={this.state.timerInterval} 
            timerBought={this.state.timer}/>
          </div>
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
      this.setState({clickBase: 5})
    }

    if (upgrade === "improveTimer1") {
      this.setState({timerBase: 10})
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

export default App;
