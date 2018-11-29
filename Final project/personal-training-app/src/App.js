import React, { Component } from 'react';
import logo from './dumbell.svg';
import './App.css';
import CustomerTable from './components/CustomerTable.js';
import TrainingsTable from './components/TrainingsTable.js';
import ModalFormAddCustomer from './components/ModalFormAddCustomer.js';
import { Tab, Row, Col, Nav, NavItem, MenuItem, DropdownButton } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false
    }
  }

  // this seems to be the only way to add placeholder to react-table filter input field
  addFilterPlaceholder = () => {
    const filters = document.querySelectorAll("div.rt-th > input");
    for (let filter of filters) {
      filter.placeholder = "Search..";
      filter.style.paddingLeft = "10px";
    }
  }

  componentDidMount() {
    this.addFilterPlaceholder();
  }

  render() {
    let lgClose = () => this.setState({ lgShow: false });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Tab.Container id="tabs-with-dropdown" defaultActiveKey="customers">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="customers">Customers</NavItem>
                <NavItem eventKey="trainings">Trainings</NavItem>
                <DropdownButton
                  bsStyle={'default'}
                  title='Add..'
                >
                  <MenuItem eventKey="customers" onClick={() => this.setState({ lgShow: true })}>New customer</MenuItem>
                  <MenuItem eventKey="addTraining">New training</MenuItem>
                </DropdownButton>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <Tab.Pane eventKey="customers"><CustomerTable /></Tab.Pane>
                <Tab.Pane eventKey="trainings"><TrainingsTable /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <ModalFormAddCustomer show={this.state.lgShow} onHide={lgClose} />
      </div>
    );
  }
}

export default App;