import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { propEq, find } from 'ramda'
import { createSelector } from 'reselect'
import Select, {Option} from 'rc-select'

import { Project } from '../propTypes'
import formatDate from '../utils/formatDate'
import {
  projectsSelector,
  isProjectExpired,
  loadAllRequest as loadAllProjectsRequest,
  updateOneRequest as updateOneProjectRequest
} from '../redux/modules/project'
import ExpertList from '../componenets/project/ExpertList'
import 'rc-select/assets/index.css'

class ProjectDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      projectForm: this.props.project
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.project && nextProps.project) {
      this.setState({
        projectForm: nextProps.project
      })
    }
  }

  componentDidMount () {
    this.props.loadAllProjectsRequest()
  }

  handleTitleChange = (e) => {
    e.preventDefault()
    const title = e.target.value
    this.setState({
      projectForm: {
        ...this.state.projectForm,
        title
      }
    })
  }

  handleStatusChange = (status) => {
    this.setState({
      projectForm: {
        ...this.state.projectForm,
        status
      }
    })
  }

  handleExpertsChange = (experts) => {
    this.setState({
      projectForm: {
        ...this.state.projectForm,
        experts
      }
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.props.updateOneProjectRequest(this.state.projectForm)
  }

  render () {
    const project = this.state.projectForm
    if (!project) {
      return (
        <div>Loading</div>
      )
    }
    console.log('project', project)
    const {title, status, experts, createdAt} = this.state.projectForm
    return (
      <div>
        <div>{formatDate(createdAt)}</div>
        <form
          onSubmit={this.handleFormSubmit}
          className='uk-form-stacked'
        >
          <div className='uk-margin'>
            <label className='uk-form-label' htmlFor='form-stacked-text'>Title</label>
            <div className='uk-form-controls'>
              <input
                value={title}
                onChange={this.handleTitleChange}
                className='uk-input' type='text' placeholder='title' />
            </div>
          </div>
          <div className='uk-margin'>
            <label className='uk-form-label' htmlFor='form-stacked-text'>Status</label>
            <div className='uk-form-controls'>
              <Select
                disabled={isProjectExpired(this.state.projectForm)}
                value={status}
                placeholder='status'
                style={{ width: 500 }}
                onChange={this.handleStatusChange}
              >
                <Option
                  value='new'
                  text='New'
                >New</Option>
                <Option
                  value='finished'
                  text='Finished'
                >Finished</Option>
              </Select>
            </div>
          </div>
          <ExpertList
            experts={experts}
            handleValueChange={this.handleExpertsChange}
          />
          <input
            type='submit'
            className='uk-button uk-button-default'
            value={'Update'}
          />
        </form>
      </div>
    )
  }
}

ProjectDetail.propTypes = {
  project: Project,
  loadAllProjectsRequest: PropTypes.func.isRequired,
  updateOneProjectRequest: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  loadAllProjectsRequest,
  updateOneProjectRequest
}

export const projectIdSelector = (state, props) =>
  props.match.params.id

export const projectSelector = createSelector(
  projectsSelector,
  projectIdSelector,
  (projects, projectId) =>
    find(propEq('_id', projectId), projects)
)

const mapStateToProps = (state, props) => {
  return ({
    project: projectSelector(state, props)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail)
