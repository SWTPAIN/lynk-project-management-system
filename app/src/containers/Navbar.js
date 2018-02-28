import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { currentUserSelector, logout } from '../redux/modules/auth'

import './Navbar.css'

class Navbar extends React.Component {
  render () {
    const currentUser = this.props.currentUser
    return (
      <nav className='uk-navbar-container uk-margin' uk-navbar='mode: hover'>
        <div className='uk-navbar-left'>
          <ul className='uk-navbar-nav'>
            <li>
              <NavLink to='/'>
                <img className='logo' src='/logo.png' alt='log' />
              </NavLink>
            </li>
            {
              currentUser &&
              <li className='uk-active'>
                <NavLink to='/dashboard'>Dashboard</NavLink>
              </li>
            }
          </ul>
        </div>
        <div className='uk-navbar-right'>
          <ul className='uk-navbar-nav'>
            {
              currentUser &&
              <li>
                <a>{currentUser.email}</a>
                <div className='uk-navbar-dropdown'>
                  <ul className='uk-nav uk-navbar-dropdown-nav'>
                    <li>
                      <a
                        onClick={this.props.logout}
                        href='#'
                      >
                        Logout
                      </a></li>
                  </ul>
                </div>
              </li>
            }
          </ul>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string
  }),
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state)
})

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
