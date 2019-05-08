import React from 'react'

const LoginPage = () => {
  return(
    <main className="login-page">
      <form className="login-form">
        <input placeholder='Username' type='text' />
        <input placeholder='Password' type='password' />
        <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default LoginPage