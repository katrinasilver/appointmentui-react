import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa'
import Moment from 'react-moment'

export default class ListAppointments extends Component {
  render() {
    return (
      <div className="appointment-list item-list mb-3">

        { this.props.appointment.map(item => 
        
          <div className="pet-item col media py-3" key={item.id}>
            <div className="mr-3">
              <button className="pet-delete btn btn-sm btn-danger"
                onClick={() => this.props.handleDelete(item)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="pet-info media-body">
              <div className="pet-head d-flex">
                <span className="pet-name" 
                contentEditable 
                suppressContentEditableWarning
                onBlur={e => this.props.handleEdit('petName', e.target.innerText, item.id)}
                >{ item.petName }</span>
                <span className="apt-date ml-auto">
                  <Moment date={ item.aptDate } 
                  parse='YYYY-MM-DD hh:mm' 
                  format='MMM DD, YYYY h:mma' 
                  />
                </span>
              </div>

              <div className="owner-name">
                <span className="label-item">Owner: </span>
                <span
                contentEditable 
                suppressContentEditableWarning
                onBlur={e => this.props.handleEdit('ownerName', e.target.innerText, item.id)}
                >{ item.ownerName }</span>
              </div>
              <div className="apt-notes"
                contentEditable 
                suppressContentEditableWarning
                onBlur={e => this.props.handleEdit('aptNotes', e.target.innerText, item.id)}
              >{ item.aptNotes }</div>
            </div>
          </div>
          )
        }
      </div>
    )
  }
}
