import { put } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'react-router-redux'
import { actions as authActions } from '../modules/auth'
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
    yield put({type: authActions.LOGIN_SUCCESS, result: {user}})
    yield * successfulAuthenticated(token)
  } catch (e) {
    const errMsg = parseErrorMessage(e, 'Invalid Credential')
    yield put({type: authActions.LOGIN_FAILURE, error: errMsg})
    yield put(showErrorNotification(errMsg))
  }
}

export function * signup ({payload: {email, password}}) {
  try {
    const {data: {user, token}} = yield axios.post(`/api/auth/register`, { email, password })
    yield put({type: authActions.SIGNUP_SUCCESS, result: {user}})
    yield * successfulAuthenticated(token)
  } catch (e) {
    const errMsg = parseErrorMessage(e)
    yield put({type: authActions.SIGNUP_FAILURE, error: errMsg})
    yield put(showErrorNotification(errMsg))
  }
}

export function * logout () {
  window.localStorage.clear()
  yield (put(push('/')))
}
