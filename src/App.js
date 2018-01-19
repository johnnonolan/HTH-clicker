import React, { Component } from 'react';
import './App.css';
import ShopButton from './components/ShopButton';
import Score from './components/Score';
import CodeDisplay from './components/CodeDisplay';

const UPGRADES = [
  {title:'visualizer', cost:'5'},
  {title:'timer',cost:'30'},
  {title:'improveClicks1', cost:'50'},
  {title:'scoreHeader', cost:'100'},
  {title:'displayCode', cost:'10'},
  {title:'improveTimer1', cost:'50'},
  {title:'upgradesHeader', cost:'80'},
  {title:'someStyling1', cost:'40'},
  {title:'localSave', cost:'120'},
  {title:'loop', cost:'150'},
  {title:'showCSS', cost:'300'}
];

const DEFAULT_STATE = {
  score: 0,
  timerBase: 1,
  timerInterval: 5000,
  clickBase: 1,
  loopbase: 1
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = JSON.parse(localStorage.getItem('state')) || DEFAULT_STATE;
  }

  createShopButton = ({ title, cost }) => {
    const { state, buy } = this;
    const props = {
      key: title,
      title,
      buy,
      cost,
      bought: state[title]
    };

    return <ShopButton { ...props} />;
  }

  createShopButtons = (upgrades) => (
    upgrades
      .filter(upgrade => this.state.score > upgrade.cost || this.state[upgrade.title])
      .map(this.createShopButton)
  )

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
          {createShopButtons(UPGRADES)}
         </div>
         <div id="scores" className={styles}>
           <Score visualizer={visualizer} score={score} headerBought={scoreHeader}/>
           <CodeDisplay { ...codeDisplayProps }/>
          </div>
      </div>
    );
  }

  buy = (cost, upgrade) => {
    if (upgrade === 'timer') {
      this.timerOn();
    }

    if (upgrade === 'improveClicks1') {
      this.setState({clickBase: 5}, this.save());
    }

    if (upgrade === 'improveTimer1') {
      this.setState({timerBase: 10}, this.save());
    }

    if (upgrade === 'loop') {
      this.setState({loopbase: 10}, this.save());
    }

    this.setState((prevState) => ({
      score : prevState.score - cost,
      [upgrade]: true
    }), this.save());
  }

  save = () => {
    if (this.state.localSave) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  increaseScore = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      score: prevState.score + (prevState.clickBase * prevState.loopbase)
    }), this.save());
  }

  timerOn = () => {
    setInterval(() => {
      this.setState((prevState) => ({
        score: prevState.score + prevState.timerBase
      }), this.save());
    }, this.state.timerInterval);
  }
}

export default App;
