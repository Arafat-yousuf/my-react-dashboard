import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Authentication from './components/Authentication/Authentication';
import Header from './components/Header/Header';
function App() {
  return (
    <Router>
      <div className="mainApp">
      <Switch>
        <Route exact path ="/">
        <Authentication></Authentication>
        </Route>
        <Route path ="/dashboard">
          <Header/>
        </Route>

      </Switch>
      </div>
    </Router>
  );
}

export default App;
