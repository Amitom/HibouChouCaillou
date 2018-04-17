import React, { Component } from "react";
import {BrowserRouter as Router, Route } from "react-router-dom";

import App from './App.jsx';

import HomePage from 'components/StaticPages/HomePage';
import CreationPage from 'components/StaticPages/CreationPage';

class BrowserRouter extends Component {
  render() {
    return(
      <Router>
        <App>
          {/* Reswitch path gor creation */}
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/" component={CreationPage} />
        </App>
      </Router>
    );
  }
}

export default BrowserRouter;