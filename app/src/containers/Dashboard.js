import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { projectsSelector } from '../redux/modules/project'

class Dashboard extends React.Component {
  render () {
    return (
      <div>
       About
        <Link to='/'>
          <button>Go Home</button>
        </Link>
        {
          this.props.projects.map(p =>
            <div>{p}</div>
          )
        }
      </div>
    )
  }
}

Dashboard.propTypes = {
  projects: PropTypes.array
}

const mapStateToProps = state => ({
  projects: projectsSelector(state)
})

export default connect(mapStateToProps)(Dashboard)
