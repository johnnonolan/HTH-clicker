import React, { Component } from 'react';
import './App.css';
import ShopButton from './ShopButton';
import Score from './Score';
import CodeDisplay from './CodeDisplay';

class App extends Component {
  constructor(props) {
    super(props);

    const storedState = JSON.parse(localStorage.getItem('state'));

    if (storedState) {
      this.state = storedState;
    } else {
      this.state = {score: 0, timerBase: 1, timerInterval: 5000, clickBase: 1, loopbase: 1};
    }

    ['increaseScore', 'createShopButton', 'createShopButtons', 'buy'].forEach(f => (this[f] = this[f].bind(this)));
  }

  createShopButton({ title, cost }) {
    const { state, buy } = this;
    const { score } = state;

    const props = {
      key: title,
      title,
      buy,
      score,
      cost,
      bought: state[title]
    }
    return <ShopButton { ...props} />
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
      {title:"loop", cost:"150"},
      {title:"showCSS", cost:"300"}
    ];

    return upgrades.map(this.createShopButton);
  }

  render() {
    const { state, increaseScore, createShopButtons } = this;
    const { upgradesHeader, score, scoreHeader, visualizer } = state;
    const styles = this.state.someStyling1 ? "style1" : "";

    const codeDisplayProps = {
      displayCode: state.displayCode,
      clickBase: state.clickBase,
      timerBase: state.timerBase,
      timerInterval: state.timerInterval,
      timerBought: state.timer,
      loopBought: state.loop,
      cssBought: state.showCSS
    };

    return (
      <div className="App">
         <div id="clicker" className={styles}>
          <h3>Clicker</h3>
          <button name="incrementor" onClick={increaseScore}>Click Me</button>
         </div>
         <div id="upgrades" className={styles}>
          {upgradesHeader && <h3 className="header">Upgrades</h3> }
          {createShopButtons()}
         </div>
         <div id="scores" className={styles}>
           <Score visualizer={visualizer} score={score} headerBought={scoreHeader}/>
           <CodeDisplay { ...codeDisplayProps }/>
          </div>
      </div>
    );
  }

  buy(cost, upgrade) {
    let newState = {score : this.state.score - cost};
    newState[upgrade] = true;

    if (upgrade === "timer") {
      this.timerOn();
    }

    if (upgrade === "improveClicks1") {
      this.setState({clickBase: 5}, this.save)
    }

    if (upgrade === "improveTimer1") {
      this.setState({timerBase: 10}, this.save)
    }

    if (upgrade === "loop") {
      this.setState({loopbase: 10}, this.save)
    }

    this.setState(newState, this.save);
  }

  save() {
    if (this.state.localSave) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  increaseScore(e) {
    e.preventDefault();
    const { state } = this;
    const newState = {score : state.score + (state.clickBase * state.loopbase)};
    this.setState(newState, this.save);
  }

  timerOn() {
    const { state } = this;
    const newState = {score: state.score + state.timerBase};
    setInterval(()=> {this.setState(newState, this.save)}, state.timerInterval);
  }

}

export default App;
