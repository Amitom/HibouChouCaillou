import React, { Component } from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';

export default class App extends Component {

  render() {
    return (
      <main className="main-wrapper">
        <Header />
        {this.props.children}
        <Footer />
      </main>
    );
  }
}