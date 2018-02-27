import { put } from 'redux-saga/effects'
import axios from 'axios'
import { map } from 'ramda'
import { loadAllSuccess, loadAllFailure } from '../modules/project'
import { showErrorNotification } from '../modules/notification'
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
    const {data: {projects}} = yield axios.get(`api/projects`)
    yield put(loadAllSuccess(formatProjects(projects)))
  } catch (e) {
    const errMsg = parseErrorMessage(e, 'Invalid Credential')
    yield put(loadAllFailure(errMsg))
    yield put(showErrorNotification(errMsg))
  }
}
