import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from '../../../images/necktielogo.png'

class Header extends React.Component {
  logoutOnClick() {
    Axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/logout`, {withCredentials: true})
    .then(res => this.props.handleLogout())
    .catch(err => alert(err.message))
  }

  render() {
    if(this.props.loggedInStatus) {
      return(
        <header className="header">
          <Link to='/'><img src={Logo} alt='Necktie Logo' className='header_logo' /></Link>
          <div className="header_links">
            <Link to='/' className='header_links_link'>Home</Link>
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
          <Link to='/'><img src={Logo} alt='Necktie Logo' className='header_logo' /></Link>
          <div className='header_links'>
            <Link to='/' className='header_links_link'>Home</Link>
            <Link to='/login' className='header_links_link'>Login</Link>
            <Link to='/signup' className='header_links_link'>SignUp</Link>
          </div>
        </header>
      )
    }
  }
}

export default Header