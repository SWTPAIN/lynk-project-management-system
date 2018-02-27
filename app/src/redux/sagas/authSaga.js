import { put } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'react-router-redux'
import { actions } from '../modules/auth'

function * successfulAuthenticated (token) {
  window.localStorage.setItem('token', token)
  yield put(push('/dashboard'))
}

export function * login ({payload: {email, password}}) {
  try {
    const {data: {user, token}} = yield axios.post(`api/auth/login`, { email, password })
    yield put({type: actions.LOGIN_SUCCESS, result: {user}})
    yield * successfulAuthenticated(token)
  } catch (e) {
    yield put({type: actions.LOGIN_FAILURE, error: e.message})
  }
}

export function * signup ({payload: {email, password}}) {
  try {
    const {data: {user, token}} = yield axios.post(`api/auth/register`, { email, password })
    yield put({type: actions.SIGNUP_SUCCESS, result: {user}})
    yield * successfulAuthenticated(token)
  } catch (e) {
    yield put({type: actions.SIGNUP_FAILURE, error: e.message})
  }
}

export function * logout () {
  window.localStorage.clear()
  yield (put(push('/')))
}
