import React, { Component } from 'react'
import '../css/App.css'

import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'

import { without } from 'lodash'
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appointments: [],
      lastidx: 1,
      collapse: false
    }
  }

  componentDidMount = async () => {
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

  handleDelete = item => {
    // let appointments = this.state.appointments.filter(a => a !== item) //without lodash

    let appointments = this.state.appointments
    appointments = without(appointments, item)
    this.setState({ appointments })
  }

  toggleForm = () => {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  addAppointment = appt => {
    appt.id = this.state.lastidx // assign an index to new item
    this.setState({
      appointments: [ appt, ...this.state.appointments ],
      lastidx: this.state.lastidx + 1
    })
  }

  render() {

    return (
     <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointments 
                collapse={this.state.collapse}
                toggleForm={this.toggleForm}
                addAppointment={this.addAppointment}
              />
              <SearchAppointments />

              <ListAppointments 
                appointment={this.state.appointments} 
                handleDelete={this.handleDelete}
              />

              {/* Use below for stateless components
                {
                this.state.appointments.map(appt => 
                  <ListAppointments key={appt.id} id={appt.id} 
                    {...appt} handleDelete={this.handleDelete}
                  />
                )
              } */}
            </div>
          </div>
        </div>
      </div>
     </main>
    )
  }
}

