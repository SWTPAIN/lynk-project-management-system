import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import project from './project'
import auth, { actions } from './auth'
import notification from './notification'

const appReducer = combineReducers({
  project,
  auth,
  notification,
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
