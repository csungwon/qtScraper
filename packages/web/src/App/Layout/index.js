import React from 'react';

import Navigation from './Navigation';
import './style.scss';

export default ({ children }) => (
  <div className="layout--container">
    <Navigation />
    <div className="layout--content">{children}</div>
    <div className="layout--footer">
      <p>
        QtScraper © 2018 Created by{' '}
        <a href="https://github.com/csungwon">Sungwon Cho</a>
      </p>
    </div>
  </div>
);
