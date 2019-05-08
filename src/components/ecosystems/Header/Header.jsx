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
          <Link to='/'><span className='header_logo'>Necktie</span></Link>
          <div className="header_links">
            <Link to='/'><span className='header_links_link'>Home</span></Link>
            <button
            onClick={() => this.logoutOnClick()}
            className='header_links_logout-btn'
            >
            Logout
            </button>
          </div>
        </header>
      )
    } else {
      return(
        <header className="header">
          <Link to='/'><span className='header_logo'>Necktie</span></Link>
          <div className='header_links'>
            <Link to='/'><span className='header_links_link'>Home</span></Link>
            <Link to='/login'><span className='header_links_link'>Login</span></Link>
            <Link to='/signup'><span className='header_links_link'>Sign Up</span></Link>
          </div>
        </header>
      )
    }
  }
}

export default Header