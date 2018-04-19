import React, { Component } from "react";
import { injectIntl } from 'react-intl';
import { Link } from "react-router-dom";

import MainNav from 'components/MainNav';
require('./Header.scss')

class Header extends Component {
  render() {
    const { intl } = this.props;

    return (
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" href="#" to="/">
          <img className="logo" src={'public/assets/logo.svg'} alt={intl.formatMessage({id:"header.title"})} />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <nav className="collapse navbar-collapse" id="navbarSupportedContent">
          <MainNav />
        </nav>
      </header>
    );
  }
}

export default injectIntl(Header);