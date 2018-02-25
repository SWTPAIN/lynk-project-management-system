import { createStore, combineReducers, applyMiddleware } from 'redux'
import projectReducer from './redux/modules/project'

const reducer = combineReducers({
  project: projectReducer
})

const store = createStore(
  reducer,
  applyMiddleware(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
