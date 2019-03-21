import React, { Component } from 'react'
import '../css/App.css'

import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appointments: []
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('./data.json')
      const appointments = await response.json()
      appointments.map(item => item)

      this.setState({ appointments })

    } catch(err) {
      console.error(err)
    }
  }

  render() {

    return (
     <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
    
              <AddAppointments />
              <SearchAppointments />
              {/* <ListAppointments appointment={this.state.appointments} /> */}
              {
                this.state.appointments.map((appt, i) => 
                  <ListAppointments key={i} id={i} {...appt} />
                )
              }
            </div>
          </div>
        </div>
      </div>
     </main>
    )
  }
}

