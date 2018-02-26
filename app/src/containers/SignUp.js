import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { signupRequest } from '../redux/modules/auth'
import AuthForm from '../componenets/auth/Form'

class SignUp extends React.Component {
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
        Sign Up
        <AuthForm
          email={email}
          password={password}
          handleValueChange={this.handleFormValueChange}
          handleSubmit={this.handleFormSubmit}
          submitText='SignUp'
        />
        <Link
          to='/'
          className='uk-link-muted'
        >
          Login
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
    this.props.signupRequest(email, password)
  }
}

SignUp.propTypes = {
  signupRequest: PropTypes.func
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  signupRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
