import React, { Component } from 'react';
import './App.css';
import ShopButton from './components/ShopButton';
import Score from './components/Score';
import CodeDisplay from './components/CodeDisplay';

const upgrades = [
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

const defaultState = {
  score: 0,
  timerBase: 1,
  timerInterval: 5000,
  clickBase: 1,
  loopbase: 1
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = JSON.parse(localStorage.getItem('state')) || defaultState;
  }

  render() {
    const styles = this.state.someStyling1 ? 'style1' : '';

    return (
      <div className='App'>
        <div id='clicker' className={styles}>
          <h3>Clicker</h3>
          <button name='incrementor' onClick={this.increaseScore}>
            Click Me
          </button>
        </div>
        <div id='upgrades' className={styles}>
          {this.state.upgradesHeader === true ? <h3 className='header'>Upgrades</h3> : ''}
          {upgrades
            .filter(upgrade => this.state.score > upgrade.cost || this.state[upgrade.title])
            .map(upgrade => (
              <ShopButton
                key={upgrade.title}
                title={upgrade.title}
                buy={this.buy}
                bought={this.state[upgrade.title]}
                cost={upgrade.cost} />
            ))
          }
        </div>
        <div id='scores' className={styles}>
          <Score
            visualizer={this.state.visualizer}
            score={this.state.score}
            headerBought={this.state.scoreHeader}/>
          <CodeDisplay
            displayCode={this.state.displayCode}
            clickBase={this.state.clickBase}
            timerBase={this.state.timerBase}
            timerInterval={this.state.timerInterval}
            timerBought={this.state.timer}
            loopBought={this.state.loop}
            cssBought={this.state.showCSS}/>
        </div>
      </div>
    );
  }

  buy = (cost, upgrade) => {
    if (upgrade === 'timer') {
      this.timerOn();
    }

    if (upgrade === 'improveClicks1') {
      this.setState({clickBase: 5}, this.save);
    }

    if (upgrade === 'improveTimer1') {
      this.setState({timerBase: 10}, this.save);
    }

    if (upgrade === 'loop') {
      this.setState({loopbase: 10}, this.save);
    }

    this.setState((prevState) => ({
      score : prevState.score - cost,
      [upgrade]: true
    }), this.save);
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
    }), this.save);
  }

  timerOn = () => {
    setInterval(() => {
      this.setState((prevState) => ({
        score: prevState.score + prevState.timerBase
      }), this.save);
    }, this.state.timerInterval);
  }
}

export default App;
