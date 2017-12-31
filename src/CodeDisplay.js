import React, { Component } from 'react';

class CodeDisplay extends Component {
    render() {
      if (!this.props.displayCode) {
        return null;
      }
      
      return(
        <div>
        <figure>
        <figcaption>Your clicks</figcaption>
          <code>
          <pre>
            increaseScore(() => {"\u007B"} <br/> score+= {this.props.clickBase};<br/>{"\u007D"});
            </pre>  
          </code>
        </figure>
        <CodeDisplayTimer timerBought={this.props.timerBought} timerBase={this.props.timerBase} timerInterval={this.props.timerInterval} />
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

  export default CodeDisplay