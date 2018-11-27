import React, { Component } from 'react';
import logo from './dumbell.svg';
import './App.css';
import CustomerTable from './components/CustomerTable.js';
import TrainingsTable from './components/TrainingsTable.js';
import { Tab, Tabs } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Customers">
            <CustomerTable />
          </Tab>
          <Tab eventKey={2} title="Trainings">
            <TrainingsTable />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;