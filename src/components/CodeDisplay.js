import React, { Component } from 'react';

class CodeDisplay extends Component {
    render() {
      if (!this.props.displayCode) {
        return null;
      }

      let increaseScoreCode = `  score += ${this.props.clickBase};`;
      if (this.props.loopBought) {
        increaseScoreCode = ` for ( i = 0; i < 10; i++) \u007B \n     score += ${this.props.clickBase}; \n  \u007D;`
      }
      return(
        <div>
        <figure>
        <figcaption>Your clicks</figcaption>
          <code>
          <pre>
            increaseScore(() => {"\u007B"} <br/> {increaseScoreCode} <br/>{"\u007D"});
            </pre>
          </code>
        </figure>
        <CodeDisplayTimer timerBought={this.props.timerBought} timerBase={this.props.timerBase} timerInterval={this.props.timerInterval} />
        <CSSDisplay bought={this.props.cssBought} />
        </div>
        )
    }
  }

  class CodeDisplayTimer extends Component {
    render() {

      if(!this.props.timerBought) {
        return null;
      }

      return (
      <figure>
      <figcaption>Your timer</figcaption>
      <code>
      <pre>
        setInterval(()=> {"\u007B"} score += {this.props.timerBase}, {this.props.timerInterval}){"\u007D"});
      </pre>
      </code>
      </figure>)
    }
  }

  class CSSDisplay extends Component {
    render() {

      if(!this.props.bought) {
        return null;
      }

      return (
        <figure>
          <figcaption>Your CSS</figcaption>
          <code>
            <pre>
              .App {"\u007B"}
                <br />
                &nbsp;&nbsp;display: flex
                <br />
              {"\u007D"});
            </pre>
            </code>
        </figure>
      )

    }
  }

  export default CodeDisplay
