import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import project from './project'
import auth, { actions } from './auth'

const appReducer = combineReducers({
  project,
  auth,
  router: routerReducer
})

// reset redux state when logout action is dispatched
const rootReducer = (state, action) =>
  appReducer(
    action.type === actions.LOGOUT
      ? undefined
      : state
    , action
  )

export default rootReducer
