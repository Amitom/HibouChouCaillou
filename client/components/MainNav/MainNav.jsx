import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom";

class MainNav extends Component {
  render() {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/"><FormattedMessage id="homepage.title" /></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create"><FormattedMessage id="creationpage.title" /></Link>
        </li>
      </ul>
    );
  }
}

export default MainNav;