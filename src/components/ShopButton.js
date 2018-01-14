import React, { Component } from 'react';

class ShopButton extends Component {
    constructor(props) {
      super(props);
      this.state = {title : props.title};
    }

    render() {
      return (
        <button
          name={this.props.title}
          disabled={this.props.bought}
          onClick={() => this.props.buy(this.props.cost, this.props.title)}>
          {this.state.title}
        </button>
      );
    }
}

export default ShopButton;
