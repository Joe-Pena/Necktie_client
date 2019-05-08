import React from 'react'
import Header from '../../Header'
import { Home } from '../../ecosystems'
import { Route } from 'react-router-dom'
import { LoginPage } from '../../ecosystems';
import { SignUpPage } from '../../ecosystems';
class App extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      loggedInStatus: false,
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
  }


  handleLogin(data) {
    this.setState({
      loggedInStatus: true,
      user: data
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route 
          exact path='/' 
          render={props => (
            <Home {...props} loggedInStatus= {this.state.loggedInStatus} />
          )} 
        />
        <Route exact path='/login' component={LoginPage} />
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
