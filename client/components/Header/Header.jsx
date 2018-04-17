import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom";

import MainNav from 'components/MainNav';

class Header extends Component {
  render() {
    return (
      <header>
        <h1>
          <Link to="/">
            <FormattedMessage id="header.title" />
          </Link>
        </h1>
        <MainNav />
      </header>
    );
  }
}

export default Header;