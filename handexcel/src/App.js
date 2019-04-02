import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import { IndexRoute } from 'react-router';
// import './App.css';
// import Topics from './Test';
// import Login from './routers/Login/Login';
// import Admin from './routers/Admin/Admin'; 
// import NavList from './components/NavList/NavList';
// import Handexcel from './routers/Handexcel/Handexcel';
import Handexcel2 from './routers/Handexcel/Handexcel2';
import Bbalance from './routers/Bbalance/Bbalance';
// import Bdetails from './routers/Bdetails/Bdetails';
class App extends Component {
  constructor(props){
    super(props);

  }



  render() {
    return (
        <Router>
           <Switch>
              <Route exact path='/'   component = {Handexcel2}/>
              <Route path='/balance'  component = {Bbalance}/>
           </Switch>
        </Router>
    );
  }
}
export default App;
