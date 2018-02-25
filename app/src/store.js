import { createStore, combineReducers, applyMiddleware } from 'redux'
import projectReducer from './redux/modules/project'

const reducer = combineReducers({
  project: projectReducer
})

const store = createStore(
 reducer,
 applyMiddleware()
)

export default store
