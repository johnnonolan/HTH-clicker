import React, { Component } from 'react';
import './App.css';
import ShopButton from './ShopButton';
import Score from './Score';
import CodeDisplay from './CodeDisplay';

class App extends Component {
  constructor(props) {
    super(props);
    let storedState = JSON.parse( localStorage.getItem('state'));
    if (storedState) {
      this.state = storedState;
    } else {
      this.state = {score: 0, timerBase: 1, timerInterval: 5000, clickBase: 1, loopbase: 1};
    }
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
      {title:"timer",cost:"30"},
      {title:"improveClicks1", cost:"50"},
      {title:"scoreHeader", cost:"100"},
      {title:"displayCode", cost:"10"},
      {title:"improveTimer1", cost:"50"},
      {title:"upgradesHeader", cost:"80"},
      {title:"someStyling1", cost:"40"},
      {title:"localSave", cost:"120"},
      {title:"loop", cost:"150"}
    ];
    return upgrades.map(this.createShopButton);
  }
  
  render() {
    let styles = this.state.someStyling1 ? "style1" : ""; 
    return (
      <div className="App">
         <div id="clicker" className={styles}>
          <h3>Clicker</h3>
          <button name="incrementor" onClick={this.increaseScore}>Click Me</button>
         </div>
         <div id="upgrades" className={styles}>
          {this.state.upgradesHeader === true ? <h3 className="header">Upgrades</h3>: ''}
          {this.createShopButtons()}
         </div>
         <div id="scores" className={styles}>
           <Score visualizer={this.state.visualizer} score={this.state.score} headerBought={this.state.scoreHeader}/>
           <CodeDisplay 
            displayCode={this.state.displayCode} 
            clickBase={this.state.clickBase} 
            timerBase={this.state.timerBase} 
            timerInterval={this.state.timerInterval} 
            timerBought={this.state.timer}
            loopBought={this.state.loop}/>
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
      this.setState({clickBase: 5}, this.save())
    }

    if (upgrade === "improveTimer1") {
      this.setState({timerBase: 10}, this.save())
    }

    if (upgrade === "loop") {
      this.setState({loopbase: 10}, this.save())
    }

    this.setState (state, this.save());
  }

  save() {
    if (this.state.localSave) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  increaseScore(e) {
    e.preventDefault();
    this.setState ({score : this.state.score + (this.state.clickBase * this.state.loopbase)}, this.save());
  }

  timerOn() {
    setInterval(()=> {this.setState({score: this.state.score + this.state.timerBase}, this.save())},this.state.timerInterval); 
  }

}

export default App;
