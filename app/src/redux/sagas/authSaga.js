import { put } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'react-router-redux'
import { loginSuccess, loginFailure, signupSuccess, signupFailure } from '../modules/auth'
import { showErrorNotification } from '../modules/notification'
import parseErrorMessage from '../../utils/parseErrorMessage'

function * successfulAuthenticated (token) {
  window.localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = token
  yield put(push('/dashboard'))
}

export function * login ({payload: {email, password}}) {
  try {
    const {data: {user, token}} = yield axios.post(`/api/auth/login`, { email, password })
    yield put(loginSuccess(user))
    yield * successfulAuthenticated(token)
  } catch (e) {
    const errMsg = parseErrorMessage(e, 'Invalid Credential')
    yield put(loginFailure(errMsg))
    yield put(showErrorNotification(errMsg))
  }
}

export function * signup ({payload: {email, password}}) {
  try {
    const {data: {user, token}} = yield axios.post(`/api/auth/register`, { email, password })
    yield put(signupSuccess(user))
    yield * successfulAuthenticated(token)
  } catch (e) {
    const errMsg = parseErrorMessage(e)
    yield put(signupFailure(errMsg))
    yield put(showErrorNotification(errMsg))
  }
}

export function * logout () {
  window.localStorage.clear()
  yield (put(push('/')))
}
