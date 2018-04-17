import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';

import CreationBox from 'components/CreationBox';

class CreationPage extends Component {
  render() {

    return (
      <section className="creationpage">
        <h1><FormattedMessage id="creationpage.title" /></h1>
        <CreationBox />
      </section>
    );
  }
}

export default CreationPage;