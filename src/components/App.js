import React, { Component } from 'react'
import '../css/App.css'

import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appointments: [],
      lastidx: 1
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('./data.json')
      const appointments = await response.json()

      appointments.map((item) => {

        //inject an index
        item.id = this.state.lastidx
        this.setState({ lastidx: this.state.lastidx + 1 })
        return item

      })

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

              {/* Use below if you want props to have a name reference on child component. 
              Usually better for if your child component will eventually have state */}
              {/* <ListAppointments appointment={this.state.appointments} /> */}
              {
                this.state.appointments.map(appt => 
                  <ListAppointments key={appt.id} id={appt.id} {...appt} />
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

