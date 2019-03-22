import React, { Component } from 'react'
import '../css/App.css'

import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'

import { without, findIndex } from 'lodash'
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appointments: [],
      lastidx: 1,
      collapse: false,
      orderBy: 'petName',
      orderDir: 'asc',
      searchVal: ''
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

  changeOrder = (orderBy, orderDir) => {
    this.setState({
      orderBy, orderDir
    })
  }

  handleSearch = searchVal => {
    this.setState({ searchVal })
  }

  handleEdit = (name, val, id) => {
    let appt = this.state.appointments
    let aptid = findIndex(this.state.appointments, { id })
    appt[aptid][name] = val
    
    this.setState({
      appointments: appt
    })
  }

  render() {

    let order
    let filterApts = this.state.appointments

    if (this.state.orderDir === 'asc') order = 1
    else order = -1

    filterApts = filterApts.sort((a,b) => {

      if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {
        return -1 * order //multiply to reverse sort based on asc or des
      } else return 1 * order

    }).filter(item => {

      return Object.values(item).reduce((acc,val) => acc || (typeof val === 'string' &&
        val.toLowerCase().includes(this.state.searchVal.toLowerCase())
      ), false)
      
    })

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

              <SearchAppointments 
                orderBy={this.state.orderBy}
                orderDir={this.state.orderDir}
                changeOrder={this.changeOrder}
                handleSearch={this.handleSearch}
              />
              {
                filterApts.length === 0 ? <div className="item-list mb-3">Item not found</div> :
                <ListAppointments 
                  appointment={filterApts} 
                  handleDelete={this.handleDelete}
                  handleEdit={this.handleEdit}
                />
              }

            </div>
          </div>
        </div>
      </div>
     </main>
    )
  }
}

