import { compose, prop, filter, propEq, allPass, not } from 'ramda'
import { createSelector } from 'reselect'
import addDays from 'date-fns/add_days'
import isBefore from 'date-fns/is_before'
import createAction from '../../helpers/redux/createAction'

const LOAD_ALL_REQUEST = createAction('LOAD_ALL_REQUEST')
const LOAD_ALL_SUCCESS = createAction('LOAD_ALL_SUCCESS')
const LOAD_ALL_FAILURE = createAction('LOAD_ALL_FAILURE')

export const actions = {
  LOAD_ALL_REQUEST,
  LOAD_ALL_SUCCESS,
  LOAD_ALL_FAILURE
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

// reducers
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_REQUEST:
      return loadAllRequestReducer(state, action)
    case LOAD_ALL_SUCCESS:
      return loadAllSuccessReducer(state, action)
    case LOAD_ALL_FAILURE:
      return loadAllFailureReducer(state, action)
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
  type: LOAD_ALL_SUCCESS,
  payload: {errMsg}
})

// selectors
export const projectsSelector = state => state.project.projects

const threeDaysAgo = addDays(new Date(), -3)
const isProjectExpired = project => isBefore(prop('createdAt', project), threeDaysAgo)
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
