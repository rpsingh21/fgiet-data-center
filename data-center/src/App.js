import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

import HeaderMenuBar  from './components/header/header'
import HomePage from './home'
import LoginComponent from './auth/login'
import FeeApp from './fee-app'

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderMenuBar/>
        <Route exact path='/' component={HomePage}/>
        <Route path='/fee' component={FeeApp}/>
        <Route path='/login' component={LoginComponent}/>
      </Router>
    </div>
  );
}

export default App;
