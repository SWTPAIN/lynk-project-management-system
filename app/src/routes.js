import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Dashboard from './containers/Dashboard'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}
