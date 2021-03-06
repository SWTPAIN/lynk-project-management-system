import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { compose, not } from 'ramda'
import Dashboard from './containers/Dashboard'
import ProjectDetail from './containers/ProjectDetail'
import LogIn from './containers/LogIn'
import SignUp from './containers/SignUp'
import Navbar from './containers/Navbar'

const isAuthenticated = () => {
  const token = window.localStorage.getItem('token')
  return !!token
}

const RestrictedRoute = predicate => redirectPathName => ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      predicate() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectPathName,
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const AuthenticatedOnlyRoute = RestrictedRoute(isAuthenticated)('/')
const VisitorOnlyRoute = RestrictedRoute(compose(not, isAuthenticated))('/dashboard')

export default ({history}) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Navbar to='/about'>About</Navbar>
        <div className='uk-section uk-section-default'>
          <div className='uk-container'>
            <Switch>
              <VisitorOnlyRoute exact path='/' component={LogIn} />
              <VisitorOnlyRoute path='/signup' component={SignUp} />
              <AuthenticatedOnlyRoute path='/dashboard' component={Dashboard} />
              <Route path='/project/:id' component={ProjectDetail} />
            </Switch>
          </div>
        </div>
      </div>
    </ConnectedRouter>
  )
}
