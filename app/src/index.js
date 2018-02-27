import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import './index.css'
import createStore from './createStore'
import AppRoutes from './routes'
import registerServiceWorker from './registerServiceWorker'

const history = createHistory()
const store = createStore(history)

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes history={history} />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
