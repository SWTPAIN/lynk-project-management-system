import { takeLatest, all } from 'redux-saga/effects'
// ACTION TYPES
import { actions as authActions } from '../modules/auth'
import { actions as projectActions } from '../modules/project'
import { actions as notificationActions } from '../modules/notification'

// Sagas
import { login, signup, logout } from './authSaga'
import { loadAll as loadAllProjects, updateOne } from './projectSaga'
import { showNotification } from './notificationSaga'

export default function * rootSaga () {
  yield all([
    takeLatest(authActions.LOGIN_REQUEST, login),
    takeLatest(authActions.SIGNUP_REQUEST, signup),
    takeLatest(authActions.LOGOUT, logout),
    takeLatest(notificationActions.SHOW_NOTIFICATION, showNotification),
    takeLatest(projectActions.LOAD_ALL_REQUEST, loadAllProjects),
    takeLatest(projectActions.UPDATE_ONE_REQUEST, updateOne)
  ])
}
