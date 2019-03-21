import React, { Component } from 'react'
import '../css/App.css'

import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Katrina'
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
     <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              {
                this.state.name
              }
              <AddAppointments />
              <SearchAppointments />
              <ListAppointments />
            </div>
          </div>
        </div>
      </div>
     </main>
    )
  }
}

