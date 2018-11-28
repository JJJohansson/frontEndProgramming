import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

class TrainingsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: []
        }
    }

    getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings/')
            .then((response) => {
                if (!response.ok) {
                    console.log('Oops! Something went wrong!')
                }
                else
                    return response.json()
            })
            .then((responseJSON) => {

                let trainings = responseJSON.filter((training) => {
                    // someone added a training without a customer to the database. null values broke the code so here's a quick fix.
                    if (!training.customer) {
                        return false;
                    }
                    return true;
                })

                trainings.map((training, index) => {
                    // format the date to correct form
                    return training.date = moment((training.date)).format('MM/DD/YYYY hh:mm');
                });

                this.setState({ trainings })
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
            <div id="trainings">
                <ReactTable data={this.state.trainings}
                    defaultPageSize={10}
                    filterable
                    defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row)}
                    columns={[
                        {
                            Header: 'Date (MM/DD/YYYY)',
                            accessor: 'date'
                        },
                        {
                            id: 'customer.id',
                            Header: 'Customer',
                            accessor: data => `${data.customer.firstname} ${data.customer.lastname}`
                        },
                        {
                            Header: 'Activity',
                            accessor: 'activity'
                        },
                        {
                            Header: 'Duration (minutes)',
                            accessor: 'duration',
                            filterable: false
                        },
                    ]}
                    className="-striped -highlight"
                />
            </div>
        )
    }

}

export default TrainingsTable;