import React from 'react'
import dotenv from 'dotenv'
import Axios from 'axios'
import { Header } from '../../ecosystems'
import { Home } from '../../ecosystems'
import { Route } from 'react-router-dom'
import { LoginPage } from '../../ecosystems';
import { SignUpPage } from '../../ecosystems';

dotenv.config()

class App extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      loggedInStatus: false,
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  checkLoginStatus () {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/logged_in`, { withCredentials: true })
    .then(res => {
      if(res.data.logged_in && !this.state.loggedInStatus) {
        this.setState({
          loggedInStatus: true,
          user: res.data.user
        })
      } else if (!res.data.logged_in && this.state.loggedInStatus) {
        this.setState({
          loggedInStatus: false,
          user: {}
        })
      }
    })
    .catch(err => console.log('error mount login', err))
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: true,
      user: data
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: false,
      user: {}
    })
  }

  render() {
    return (
      <div className="App">
        <Header 
          loggedInStatus= {this.state.loggedInStatus}
          handleLogout= {this.handleLogout}  
        />
        <Route 
          exact path='/' 
          render={props => (
            <Home {...props} 
              loggedInStatus= {this.state.loggedInStatus}
              username= {this.state.user.username} 
            />
          )} 
        />
        <Route 
          exact path='/login' 
          render={props => (
            <LoginPage {...props}
              loggedInStatus= {this.state.loggedInStatus}
              handleLogin={this.handleLogin}
            />
          )} 
        />
        <Route 
          exact path='/signup' 
          render={props => (
            <SignUpPage {...props}
              loggedInStatus= {this.state.loggedInStatus}
              handleLogin={this.handleLogin}
            />
          )} 
        />
      </div>
    );
  }
}

export default App;
