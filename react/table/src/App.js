import React, { Component } from 'react';
import logo from './list.png';
import './App.css';
import TodoTable from './TodoTable'
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      date: '',
      todos: [{date: '25.07.1991', description: 'Get born son!'},
              {date: '28.08.2018', description: 'Finish this god damn assignment'},
              {date: '24.12.2018', description: 'Open up those presents!'},
              {date: '31.12.2018', description: 'Shoot up some rockets!'},
              {date: '01.05.2017', description: '404 - Memory not found'},
              {date: '19.09.2018', description: 'Do this'},
              {date: '20.09.2018', description: 'Do that'},
              {date: '21.09.2018', description: 'Do something'},
              {date: '22.09.2018', description: 'Realize that you have done nothing'},
              {date: '23.09.2018', description: 'Actually do the thing'}]
    }
  }

  inputChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  addTodo = (event) => {
    event.preventDefault();
    const todo = {};
    todo.date = this.state.date;
    todo.description = this.state.description;
    this.setState({
      todos: [...this.state.todos, todo]
    });
  }

  removeTodo = (event) => {
    const id = parseInt(event.target.id);
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== id)
    });
  }

  render() {
    return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Things to do..</h1>
         </header>
         <div id="todos">
            <fieldset>
               <legend>Add todo:</legend>
               <form onSubmit={this.addTodo} style={{padding: "0.1em"}}>
                  Description: <input type="text" name="description" size="20" onChange={this.inputChange} style={{marginRight: "10px"}} />
                Date: <input type="text" name="date" size="20" onChange={this.inputChange} />
                  <input type="submit" value="Add" />
               </form>
            </fieldset>

            <ReactTable data={this.state.todos}
              defaultPageSize={10}
              columns={[
                {
                  Header: 'Description',
                  accessor: 'description'
                },
                {
                  Header: 'Date',
                  accessor: 'date'
                },
                {
                  accessor: 'row.index',
                  Cell: row => (<button onClick={this.removeTodo} id={row.index}>Delete</button>)
               }
              ]}
              className="-striped -highlight" />

         </div>
      </div>
    );
  }
}

export default App;
