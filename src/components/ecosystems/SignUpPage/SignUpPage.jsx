import React from 'react'
import axios from 'axios'

class SignUpPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      registrationErrors: ''
    }
  }

  formSubmit(e) {
    e.preventDefault()
    const { username, email, password, password_confirmation} = this.state
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
      user: {
        username,
        email,
        password,
        password_confirmation
      }
    },
    { withCredentials: true }
    ).then(res => {
      if(res.status === 201) {
        this.props.handleLogin(res.data.data)
        this.props.history.push('/')
      }
    }).catch(err => {
      console.log('Something wong', err)
    })
    
    this.setState({
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
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
        <h1>Register below</h1>
        <form 
          className="signup-page_signup-form"
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
            placeholder='Email' 
            type='email' 
            name='email'
            value={this.state.email}
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
          <input 
            placeholder='Confirm Password' 
            type='password'
            name='password_confirmation'
            value={this.state.password_confirmation}
            onChange={(e) => this.inputChange(e)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </main>
    )
  }
}

export default SignUpPage