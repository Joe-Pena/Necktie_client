import React from 'react'
import Header from '../../Header'
import { Home } from '../../ecosystems'
import { Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Route exact path='/' component={Home} />
    </div>
  );
}

export default App;
