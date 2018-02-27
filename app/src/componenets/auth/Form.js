import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class AuthForm extends PureComponent {
  state = {
    passwordError: null
  }

  render () {
    const {email, password, submitText} = this.props
    const {passwordError} = this.state
    return (
      <form onSubmit={this.handleSubmit} >
        <div className='uk-margin'>
          <div className='uk-inline'>
            <span className='uk-form-icon' data-uk-icon='icon: user' />
            <input
              value={email}
              name='email'
              onChange={this.handleInputValueChange}
              className='uk-input'
              type='email'
              required
            />
          </div>
        </div>
        <div className='uk-margin'>
          <div className='uk-inline'>
            <span className='uk-form-icon' data-uk-icon='icon: lock' />
            <input
              value={password}
              name='password'
              onChange={this.handleInputValueChange}
              className={`uk-input ${passwordError && 'uk-form-danger'}`}
              type='password'
              minlengh={8}
              required
            />
          </div>
          <p>{passwordError}</p>
        </div>
        <input
          type='submit'
          className='uk-button uk-button-default'
          value={submitText}
        />
      </form>
    )
  }

  handleInputValueChange = (e) => {
    e.preventDefault()
    this.props.handleValueChange(
      e.target.name,
      e.target.value
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {password, email} = this.props
    if (password.length < 8) {
      this.setState({
        passwordError: 'Password has to be longer or equal to 8'
      })
      return
    }
    console.log('password :', password)
    if (!/^[a-z0-9]+$/i.test(password)) {
      this.setState({
        passwordError: 'Password can only contain letter or number'
      })
      return
    }
    this.props.handleSubmit(email, password)
  }
}

AuthForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired
}
