import React from 'react'
import axios from 'axios'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      registrationErrors: ''
    }
  }

  formSubmit(e) {
    e.preventDefault()
    const { username, password } = this.state
    axios.post('http://localhost:3001/api/v1/sessions', {
      user: {
        username,
        password,
      }
    },
    { withCredentials: true }
    ).then(res => {
      if(res.status === 201) {
        this.props.handleLogin(res.data.user)
        this.props.history.push('/')
      }
    }).catch(err => {
      alert(err.message)
    })
    
    this.setState({
      username: '',
      password: '',
      registrationErrors: ''
    })
  }

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <main className="signup-page">
        <form 
          className="signup-form"
          onSubmit={(e) => this.formSubmit(e)}  
        >
          <input 
            placeholder='Username' 
            type='text' 
            name='username'
            value={this.state.username}
            onChange={(e) => this.inputChange(e)}
            required
          />
          <input 
            placeholder='Password' 
            type='password' 
            name='password'
            value={this.state.password}
            onChange={(e) => this.inputChange(e)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </main>
    )
  }
}

export default LoginPage