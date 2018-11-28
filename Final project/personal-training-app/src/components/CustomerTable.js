import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import deleteImg from './img/delete.png';

class CustomerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers/')
        .then((response) => {
            if (!response.ok) {
                console.log('Oops! Something went wrong!')
            }
            else
                return response.json()
        })
        .then((responseJSON) => {
            console.log(responseJSON);
            this.setState({ customers: responseJSON.content })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return (
            row[id] !== undefined ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            :
                true
        );
    }

    componentWillMount() {
        this.getCustomers();
    }


    render() {
        return (
            <div id="customers">
                <ReactTable data={this.state.customers}
                    defaultPageSize={10}
                    filterable
                    defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row)}
                    columns={[
                        {
                            Header: 'First name',
                            accessor: 'firstname'
                        },
                        {
                            Header: 'Last name',
                            accessor: 'lastname'
                        },
                        {
                            Header: 'Email',
                            accessor: 'email'
                        },
                        {
                            Header: 'Phone number',
                            accessor: 'phone'
                        },
                        {
                            Header: 'Street address',
                            accessor: 'streetaddress'
                        },
                        {
                            Header: 'Postcode',
                            accessor: 'postcode'
                        },
                        {
                            Header: 'City',
                            accessor: 'city'
                        },
                        {
                            filterable: false,
                            accessor: 'row.index',
                            Cell: <img src={deleteImg} alt='delete' style={{opacity: 0.4}} width='12' height='12'></img>,
                            width: 50
                        }
                    ]}
                    className="-striped -highlight"
                />
            </div>
        )
    }

}

export default CustomerTable;