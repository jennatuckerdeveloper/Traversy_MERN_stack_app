import React, { Component } from 'react'
import Moment from 'react-moment'
import isEmpty from '../../validation/is-empty'

class ProfileCreds extends Component {
  render() {

    const { experience, education } = this.props

    const expItems = experience.map(exp => (
      <li key={exp._id} className='list-group-item'>
        <h4>{exp.company}</h4>
        <p>
          <Moment format='DD/MM/YYY'>{exp.from}</Moment>  -  {exp.to === null ? ('Now') : (
            <Moment format='DD/MM/YYY'>{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}</p>
        <p>
          {isEmpty(exp.location) ? null : (<span><strong>Location: </strong> {exp.location}</span>)}
        </p>
        <p>
          {isEmpty(exp.description) ? null : (<span><strong>Description: </strong> {exp.description}</span>)}
        </p>
      </li>
    ))

    const eduItems = education.map(edu => (
      <li key={edu._id} className='list-group-item'>
        <h4>{edu.school}</h4>
        <p>
          <Moment format='DD/MM/YYY'>{edu.from}</Moment>   -  {edu.to === null ? ('Now') : (
            <Moment format='DD/MM/YYY'>{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree or Certificate:</strong> {edu.degree}</p>
        <p><strong>Field of Study:</strong> {edu.fieldofstudy}</p>
        <p>
          {isEmpty(edu.location) ? null : (<span><strong>Location: </strong> {edu.location}</span>)}
        </p>
        <p>
          {isEmpty(edu.description) ? null : (<span><strong>Description: </strong> {edu.description}</span>)}
        </p>
      </li>
    ))

    return (
      <div className='row'>
          <div className="col-md-6 mb-3">
            <h3 className="text-center text-info">Experience</h3>
            {expItems.length > 0 ? (
              <ul className="list-group">{expItems}</ul>
            ) : (
              <p className="text-center">No Experience Listed</p>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <h3 className="text-center text-info">Education</h3>
            {eduItems.length > 0 ? (
              <ul className="list-group">{eduItems}</ul>
            ) : (
              <p className="text-center">No Education Listed</p>
            )}
          </div>
      </div>
    )
  }
}

export default ProfileCreds