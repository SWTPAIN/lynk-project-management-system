import createAction from '../../helpers/redux/createAction'

const LOGIN_REQUEST = createAction('AUTH/LOGIN_REQUEST')
const LOGIN_SUCCESS = createAction('AUTH/LOGIN_SUCCESS')
const LOGIN_FAILURE = createAction('AUTH/LOGIN_FAILURE')
const SIGNUP_REQUEST = createAction('AUTH/SIGNUP_REQUEST')
const SIGNUP_SUCCESS = createAction('AUTH/SIGNUP_SUCCESS')
const SIGNUP_FAILURE = createAction('AUTH/SIGNUP_FAILURE')
const HYDRATE = createAction('/AUTH/HYDRATE')
const LOGOUT = createAction('/AUTH/LOGOUT')

export const actions = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT
}

const initialState = {
  user: null,
  errors: null,
  isLoading: false
}

// reducers
const loginRequestReducer = (state, action) => ({
  ...state,
  isLoading: true
})

const loginSuccessReducer = (state, action) => ({
  ...state,
  user: action.result.user,
  errors: null,
  isLoading: false
})

const loginFailureReducer = (state, action) => ({
  ...state,
  errors: action.error,
  isLoading: false
})

const signupRequestReducer = (state, action) => ({
  ...state,
  isLoading: true
})

const signupSuccessReducer = (state, action) => ({
  ...state,
  user: action.result.user,
  errors: null,
  isLoading: false
})

const signupFailureReducer = (state, action) => ({
  ...state,
  errors: action.error,
  isLoading: false
})

const hydrateReducer = signupSuccessReducer

// reducers
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return loginRequestReducer(state, action)
    case LOGIN_SUCCESS:
      return loginSuccessReducer(state, action)
    case LOGIN_FAILURE:
      return loginFailureReducer(state, action)
    case SIGNUP_REQUEST:
      return signupRequestReducer(state, action)
    case SIGNUP_SUCCESS:
      return signupSuccessReducer(state, action)
    case SIGNUP_FAILURE:
      return signupFailureReducer(state, action)
    case HYDRATE:
      return hydrateReducer(state, action)
    default:
      return state
  }
}

// action creators
export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: {
    email,
    password
  }
})

export const signupRequest = (email, password) => ({
  type: SIGNUP_REQUEST,
  payload: {
    email,
    password
  }
})

export const hydrate = user => ({
  type: HYDRATE,
  result: {
    user
  }
})

export const logout = () => ({
  type: LOGOUT
})

// selectors
export const currentUserSelector = state =>
  state.auth.user
export const isAuthenticatedSelector = state => !!currentUserSelector(state)
