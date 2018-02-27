import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { loginRequest } from '../redux/modules/auth'
import AuthForm from '../componenets/auth/Form'

class LogIn extends React.Component {
  state = {
    form: {
      email: '',
      password: ''
    }
  }
  render () {
    const { form: { email, password } } = this.state
    return (
      <div>
        Login
        <AuthForm
          email={email}
          password={password}
          handleValueChange={this.handleFormValueChange}
          handleSubmit={this.handleFormSubmit}
          submitText='Login'
        />
        <Link
          to='/signup'
          className='uk-link-muted'
        >
          Sign Up
        </Link>
      </div>
    )
  }

  handleFormValueChange = (fieldName, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [fieldName]: value
      }
    })
  }

  handleFormSubmit = (email, password) => {
    this.props.loginRequest(email, password)
  }
}

LogIn.propTypes = {
  loginRequest: PropTypes.func
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  loginRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
