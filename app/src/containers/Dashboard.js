import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { projectsSelector } from '../redux/modules/project'

class Dashboard extends React.Component {
  render () {
    return (
      <div>
       Dashboard
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
