import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom";

class MainNav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/"><FormattedMessage id="homepage.title" /></Link>
          </li>
          <li>
            <Link to="/create"><FormattedMessage id="creationpage.title" /></Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default MainNav;