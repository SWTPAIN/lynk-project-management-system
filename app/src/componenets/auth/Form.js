import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class AuthForm extends PureComponent {
  render () {
    const {email, password, submitText} = this.props
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
              type='text'
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
              className='uk-input'
              type='password'
            />
          </div>
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
    this.props.handleSubmit(this.props.email, this.props.password)
  }
}

AuthForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired
}
