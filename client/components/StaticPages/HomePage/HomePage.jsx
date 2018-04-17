import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';

class HomePage extends Component {
  render() {

    return (
      <section className="homepage">
        <h1>
          <FormattedMessage id="homepage.title" />
        </h1>
      </section>
    );
  }
}

export default HomePage;