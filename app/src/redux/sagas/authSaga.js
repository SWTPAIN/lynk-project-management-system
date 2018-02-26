import { put } from 'redux-saga/effects'
import axios from 'axios'
import { actions } from '../modules/auth'

export function * login ({payload: {email, password}}) {
  try {
    const {user, token} = yield axios.post(`api/auth/login`, { email, password })
    // db side effect
    window.localStorage.set('token', token)
    yield put({type: actions.LOGIN_SUCCESS, result: {user}})
  } catch (e) {
    yield put({type: actions.LOGIN_FAILURE, error: e.message})
  }
}

export function * signup ({payload: {email, password}}) {
  try {
    const result = yield axios.post(`api/auth/register`, { email, password })
    console.log('result: ', result)
    const user = {
      email, password
    }
    yield put({type: actions.SIGNUP_SUCCESS, result: {user}})
  } catch (e) {
    yield put({type: actions.SIGNUP_FAILURE, error: e.message})
  }
}
