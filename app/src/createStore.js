import { createStore as createStore_, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import jwtDecode from 'jwt-decode'
import rootSaga from './redux/sagas'
import rootReducer from './redux/modules/rootReducer'
import { hydrate } from './redux/modules/auth'

const getHydratedUser = () => {
  try {
    const {email} = jwtDecode(window.localStorage.getItem('token'))
    return {email}
  } catch (e) {
    window.localStorage.clear()
    return null
  }
}

const createStore = history => {
  const middlewares = []
  const initialState = {}

  // react router middlware
  middlewares.push(routerMiddleware(history))

  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware()
  middlewares.push(sagaMiddleware)

  const enhancers = [applyMiddleware(...middlewares)]
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

  const store = createStore_(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  )

  const user = getHydratedUser()
  if (user) {
    store.dispatch(hydrate(user))
  }

  sagaMiddleware.run(rootSaga)
  return store
}

export default createStore
