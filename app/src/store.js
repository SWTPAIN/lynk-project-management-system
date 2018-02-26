import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/sagas'
import project from './redux/modules/project'
import auth from './redux/modules/auth'

const reducer = combineReducers({
  project,
  auth
})

const middlewares = []

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

const enhancers = [applyMiddleware(...middlewares)]
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const store = createStore(
  reducer,
  {},
  composeEnhancers(...enhancers)
)

sagaMiddleware.run(rootSaga)

export default store
