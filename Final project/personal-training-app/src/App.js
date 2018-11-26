import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers/')
    .then((response) => {
      if (!response.ok) {
        console.log('Oops! Something went wrong!')
      }
      else
        return response.json()
    })
    .then((responseJSON) => console.log(responseJSON));
  }

  componentDidMount() {
    this.getCustomers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
