import React, { Component } from 'react';
import './App.css';
import LexChat from './lexChat';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], isLoaded: true };
  }

  componentDidMount = () => {
    //this.getFloorplans(10);
    this.getUnits(10);
  }

  getPropertySummary = (val) => {

    fetch('http://localhost:3001/api/property/1731362/summary', {
      method: 'GET'
    }).then(response => {
      response.json().then(body => {
        this.setState({
          isLoaded: true,
          summary: body
        });
      });
    });
  }

  getFloorplans = (val) => {

    fetch('http://localhost:3001/api/property/1731362/floorplans', {
      method: 'GET'
    }).then(response => {
      response.json().then(body => {
        this.setState({
          isLoaded: true,
          floorplans: body.floorplans.slice(0, val),
        });
      });
    });
  }

  getUnits = (val) => {

    fetch('http://localhost:3001/api/property/1731362/units', {
      method: 'GET'
    }).then(response => {
      response.json().then(body => {
        this.setState({
          isLoaded: true,
          units: body.units.slice(0, val),
        });
      });
    });
  }

  resetData = () => {
    this.setState({ units: [] });
  }

  render() {
    return (
      <div className="App">
        {
          (!(this.state.units && this.state.units.length > 0)) && <header className="App-header h1">
            Welcome to RealPage Virtual Assistant.
       </header>
        }
        {
          (this.state.units && this.state.units.length > 0) &&
          <div className="text-left">
            <h3 className="h4 pb-2">Unit List</h3>
          </div>
        }
        <table className='table table-striped table-bordered'>
          {
            (this.state.units && this.state.units.length > 0) &&
            <thead>
              <tr>
                <th>
                  Unit Name
              </th>
              <th>
                  Bed, Bath
              </th>
                <th>
                  Rent
              </th>
                <th>
                 Deposit In Months
              </th>
                <th>
                Lease Status
              </th>
              </tr>
            </thead>
          }
          <tbody>
            {this.state.units && this.state.units.map(function (item, key) {
              return (
                <tr key={key}>
                  <td>{item.unitNumber}</td>
                  <td>{item.numberOfBeds},{item.numberOfBaths} </td>
                  <td>{item.rent}</td>
                  <td>{item.depositInMonths}</td>
                  <td>{item.leaseStatus}</td>
                </tr>
              )

            })}</tbody>
        </table>

        <LexChat botName="Real_page_lex"
          IdentityPoolId="us-east-1:67c4a944-8f5f-487c-8c50-0471938764de"
          placeholder="Enter your query"
          style={{ position: 'absolute' }}
          backgroundColor="#FFFFFF"
          height="400px"
          region="us-east-1"
          headerText="Online Support" onChange={this.getUnits} resetData={this.resetData} />
      </div>
    );
  }
}

export default App;
