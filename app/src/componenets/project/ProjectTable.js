import React from 'react'
import PropTypes from 'prop-types'
import { compose, join, pluck } from 'ramda'
import { Link } from 'react-router-dom'
import {Project} from '../../propTypes'
import formatDate from '../../utils/formatDate'

const expertsToString = compose(join(', '), pluck('name'))

function ExpertList ({experts}) {
  return (
    <span>
      {expertsToString(experts)}
    </span>
  )
}

function ProjectRow ({_id, title, status, createdAt, experts}) {
  const projectUrl = `/project/${_id}`
  return (
    <tr>
      <td className='uk-table-link'>
        <Link
          to={projectUrl}
          className='uk-link-reset'
        >
          {title}
        </Link>
      </td>
      <td>
        <Link
          to={projectUrl}
          className='uk-link-reset'
        >
          {formatDate(createdAt)}
        </Link>
      </td>
      <td>
        <Link
          to={projectUrl}
          className='uk-link-reset'
        >
          {status}
        </Link>
      </td>
      <td>
        <Link
          to={projectUrl}
          className='uk-link-reset'
        >
          <ExpertList experts={experts} />
        </Link>
      </td>
    </tr>
  )
}

export default function ProjectTable ({title, projects}) {
  return (
    <div>
      <h2 className='uk-heading-primary'>
        {title}
      </h2>
      <table className='uk-table uk-table-divider uk-table-hover'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Date</th>
            <td>Status</td>
            <td>Experts</td>
          </tr>
        </thead>
        <tbody>
          {
            projects.map(project =>
              (
                <ProjectRow key={project._id} {...project} />
              ))
          }
        </tbody>
      </table>

    </div>
  )
}

ProjectTable.propTypes = {
  title: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(Project).isRequired
}
