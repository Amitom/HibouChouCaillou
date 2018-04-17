import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';

class Footer extends Component {
  render() {
    const currentDate = new Date();

    return (
      <footer>
        <p><FormattedMessage id="footer.copyright" values={{year: currentDate.getFullYear()}}/></p>
      </footer>
    );
  }
}

export default Footer;