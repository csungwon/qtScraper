import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

import './style.scss';

export default ({ children }) => (
  <div className="spinner--container">
    <HashLoader size={250} color="#a0c64b" />
    <p className="spinner--text">{children}</p>
  </div>
);
