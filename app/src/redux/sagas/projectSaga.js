import { put } from 'redux-saga/effects'
import axios from 'axios'
import { map } from 'ramda'
import {
  loadAllSuccess,
  loadAllFailure,
  updateOneSuccess,
  updateOneFailure
} from '../modules/project'
import { showErrorNotification, showSuccessNotification } from '../modules/notification'
import parseErrorMessage from '../../utils/parseErrorMessage'

const formatProject = project => (
  {
    ...project,
    createdAt: new Date(project.createdAt)
  }
)

const formatProjects = map(formatProject)

export function * loadAll () {
  try {
    const {data: {projects}} = yield axios.get(`/api/projects`)
    yield put(loadAllSuccess(formatProjects(projects)))
  } catch (e) {
    const errMsg = parseErrorMessage(e, 'Invalid Credential')
    yield put(loadAllFailure(errMsg))
    yield put(showErrorNotification(errMsg))
  }
}

export function * updateOne ({payload: {project}}) {
  try {
    const {data: {project: newProject}} = yield axios.put(`/api/projects/${project._id}`, {project})
    yield put(updateOneSuccess(formatProject(newProject)))
    yield put(showSuccessNotification('Successfully update project.'))
  } catch (e) {
    const errMsg = parseErrorMessage(e, 'Failed to update project.')
    yield put(updateOneFailure(errMsg))
    yield put(showErrorNotification(errMsg))
  }
}
