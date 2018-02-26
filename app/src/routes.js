import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './containers/Dashboard'
import LogIn from './containers/LogIn'
import SignUp from './containers/SignUp'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LogIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}
