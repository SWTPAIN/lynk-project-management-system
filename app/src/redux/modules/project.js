import { compose, prop, filter, propEq, allPass, not, when, map, always, identity } from 'ramda'
import { createSelector } from 'reselect'
import addDays from 'date-fns/add_days'
import isBefore from 'date-fns/is_before'
import createAction from '../../helpers/redux/createAction'

const LOAD_ALL_REQUEST = createAction('LOAD_ALL_REQUEST')
const LOAD_ALL_SUCCESS = createAction('LOAD_ALL_SUCCESS')
const LOAD_ALL_FAILURE = createAction('LOAD_ALL_FAILURE')
const UPDATE_ONE_REQUEST = createAction('UPDATE_ONE_REQUEST')
const UPDATE_ONE_SUCCESS = createAction('UPDATE_ONE_SUCCESS')
const UPDATE_ONE_FAILURE = createAction('UPDATE_ONE_FAILURE')

export const actions = {
  LOAD_ALL_REQUEST,
  LOAD_ALL_SUCCESS,
  LOAD_ALL_FAILURE,
  UPDATE_ONE_REQUEST,
  UPDATE_ONE_SUCCESS,
  UPDATE_ONE_FAILURE
}

const initialState = {
  projects: [],
  errors: null,
  isLoading: false
}

// reducers
const loadAllRequestReducer = (state, action) => ({
  ...state,
  isLoading: true
})

const loadAllSuccessReducer = (state, action) => ({
  ...state,
  projects: action.payload.projects,
  isLoading: false
})

const loadAllFailureReducer = (state, action) => ({
  ...state,
  errors: action.payload.errMsg,
  isLoading: false
})

const updateOneRequestReducer = (state, action) => ({
  ...state,
  isLoading: true
})

const updateOneSuccessReducer = (state, action) => {
  const project = action.payload.project
  return ({
    ...state,
    projects: map(when(propEq('id', project.id), always(project)), state.projects),
    isLoading: false
  })
}

const updateOneFailureReducer = (state, action) => ({
  ...state,
  errors: action.payload.errMsg,
  isLoading: false
})

// reducers
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_REQUEST:
      return loadAllRequestReducer(state, action)
    case LOAD_ALL_SUCCESS:
      return loadAllSuccessReducer(state, action)
    case LOAD_ALL_FAILURE:
      return loadAllFailureReducer(state, action)
    case UPDATE_ONE_REQUEST:
      return updateOneRequestReducer(state, action)
    case UPDATE_ONE_SUCCESS:
      return updateOneSuccessReducer(state, action)
    case UPDATE_ONE_FAILURE:
      return updateOneFailureReducer(state, action)
    default:
      return state
  }
}

// action creators
export const loadAllRequest = () => ({
  type: LOAD_ALL_REQUEST
})

export const loadAllSuccess = (projects) => ({
  type: LOAD_ALL_SUCCESS,
  payload: {projects}
})

export const loadAllFailure = errMsg => ({
  type: LOAD_ALL_FAILURE,
  payload: {errMsg}
})

export const updateOneRequest = (project) => ({
  type: UPDATE_ONE_REQUEST,
  payload: {project}
})

export const updateOneSuccess = (project) => ({
  type: UPDATE_ONE_SUCCESS,
  payload: {project}
})

export const updateOneFailure = errMsg => ({
  type: UPDATE_ONE_FAILURE,
  payload: {errMsg}
})

// selectors
export const projectsSelector = state => state.project.projects

const threeDaysAgo = addDays(new Date(), -3)
export const isProjectExpired = project => isBefore(prop('createdAt', project), threeDaysAgo)
const isProjectStatusNew = propEq('status', 'new')

const filterFinishedProject = filter(propEq('status', 'finished'))
const filterNewProject = filter(allPass([isProjectStatusNew, isProjectExpired]))
const filterExpiredProject = filter(allPass([isProjectStatusNew, compose(not, isProjectExpired)]))

export const newProjectsSelector = createSelector(
  projectsSelector,
  filterNewProject
)

export const finishedProjectsSelector = createSelector(
  projectsSelector,
  filterFinishedProject
)

export const expiredProjectsSelector = createSelector(
  projectsSelector,
  filterExpiredProject
)
