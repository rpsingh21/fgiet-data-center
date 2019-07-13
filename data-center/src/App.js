import React from 'react';
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import store from './store'
import HeaderMenuBar  from './components/header/header'
import HomePage from './Home'
import LoginComponent from './auth/login'
import FeeApp from './fee-app'
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <HeaderMenuBar/>
          <Route exact path='/' component={HomePage}/>
          <Route path='/fee' component={FeeApp}/>
          <Route path='/login' component={LoginComponent}/>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
