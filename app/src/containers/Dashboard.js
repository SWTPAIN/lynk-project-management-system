import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Project } from '../propTypes'
import {
  newProjectsSelector,
  finishedProjectsSelector,
  expiredProjectsSelector,
  loadAllRequest as loadAllProjectsRequest
} from '../redux/modules/project'
import ProjectTable from '../componenets/project/ProjectTable'

class Dashboard extends React.Component {
  componentDidMount () {
    this.props.loadAllProjectsRequest()
  }

  render () {
    const { newProjects, finishedProjects, expiredProjects } = this.props
    return (
      <div>
        <ProjectTable
          title='New Projects'
          projects={newProjects}
        />
        <ProjectTable
          title='Finished Projects'
          projects={finishedProjects}
        />
        <ProjectTable
          title='Expired Projects'
          projects={expiredProjects}
        />
      </div>
    )
  }
}

Dashboard.propTypes = {
  newProjects: PropTypes.arrayOf(Project),
  finishedProjects: PropTypes.arrayOf(Project),
  expiredProjects: PropTypes.arrayOf(Project),
  loadAllProjectsRequest: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  loadAllProjectsRequest
}

const mapStateToProps = state => ({
  newProjects: newProjectsSelector(state),
  finishedProjects: finishedProjectsSelector(state),
  expiredProjects: expiredProjectsSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
