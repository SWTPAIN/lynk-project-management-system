import { takeLatest, all } from 'redux-saga/effects'
// ACTION TYPES
import { actions } from '../modules/auth'

// Sagas
import { login, signup, logout } from './authSaga'

export default function * rootSaga () {
  yield all([
    takeLatest(actions.LOGIN_REQUEST, login),
    takeLatest(actions.SIGNUP_REQUEST, signup),
    takeLatest(actions.LOGOUT, logout)
  ])
}
