import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  logoutOnClick() {
    Axios.delete('http://localhost:3001/api/v1/logout', {withCredentials: true})
    .then(res => this.props.handleLogout())
    .catch(err => alert(err.message))
  }

  render() {
    if(this.props.loggedInStatus) {
      return(
        <header className="header">
          <Link to='/'><span>Logo</span></Link>
          <Link to='/'><span>Home</span></Link>
          <button
          onClick={() => this.logoutOnClick()}
          >
          Logout
          </button>
        </header>
      )
    } else {
      return(
        <header className="header">
          <Link to='/'><span>Logo</span></Link>
          <Link to='/'><span>Home</span></Link>
          <Link to='/login'><span>Login</span></Link>
          <Link to='/signup'><span>Sign Up</span></Link>
        </header>
      )
    }
  }
}

export default Header