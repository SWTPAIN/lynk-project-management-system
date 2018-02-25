import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import logo from './logo.png'

import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      response: ''
    }
  }

  componentDidMount () {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('/api/hello')
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  }

  render () {
    return (
      <div className='App'>
        <Link to='/dashboard'>
          Dashboard
        </Link>
        <img src={logo} />
        <p className='App-intro'>{this.state.response}</p>
      </div>
    )
  }
}

export default App
