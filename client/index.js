import React from 'react';
import { render} from 'react-dom';
import { IntlProvider, addLocaleData  } from 'react-intl';
import _en from 'react-intl/locale-data/en';
import _fr from 'react-intl/locale-data/fr';

import BrowserRouter from './BrowserRouter.jsx';

import en from './i18n/messages/en';
import fr from './i18n/messages/fr';

addLocaleData([..._en, ..._fr]);

let data = {en, fr};

const language = (navigator.languages && navigator.languages[0]) ||
                     navigator.language ||
                     navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages = data[languageWithoutRegionCode] || data[language] || data.en;
const locale = (data[languageWithoutRegionCode] && languageWithoutRegionCode) || ( data[language] && language ) || "en";

render(
  <IntlProvider locale={locale} messages={messages}>
    <BrowserRouter />
  </IntlProvider>,
  document.getElementById('root')
);