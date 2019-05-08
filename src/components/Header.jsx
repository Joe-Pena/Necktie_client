import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return(
    <header className="header">
      <Link to='/'><span>Logo</span></Link>
      <Link to='/'><span>Home</span></Link>
      <Link to='/login'><span>Login</span></Link>
      <Link to='/signup'><span>Sign Up</span></Link>
    </header>
  )
}

export default Header