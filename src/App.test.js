import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class LocalStorage {
  constructor() {
    this.state = {};
  }

  setItem(key, value) {
    this.state[key] = value;
  }

  getItem(key) {
    return JSON.stringify(this.state[key] || {});
  }
}
global.localStorage = new LocalStorage();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
