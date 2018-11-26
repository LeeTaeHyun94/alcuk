import React, { Component } from 'react';
import './css/App.css';
import Header from "./components/Header";
import {Route} from 'react-router-dom';
// import {Home, Board} from './components';
import Home from './components/Home'
import Board from './components/Board'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <Route exact path="/" component={Home}/>
          <Route path="/board" component={Board}/>
      </div>
    );
  }
}

export default App;
