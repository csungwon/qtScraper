import React from 'react';

import './style.scss';

const Header = ({ title, reading, date }) => (
  <header>
    <h1 className="qt__title">{title}</h1>
    {reading} | {date}
  </header>
);

export default Header;
