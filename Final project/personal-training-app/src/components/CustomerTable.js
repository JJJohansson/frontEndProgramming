import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
                    defaultPageSize={15}
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
                    ]}
                    className="-striped -highlight"
                />
            </div>
        )
    }

}

export default CustomerTable;