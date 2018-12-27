import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../logo.svg';
import { Button } from '../../../ui';
import './style.scss';

export default ({ isLoggedIn, onLogout, location }) => (
  <header className="navbar">
    <div className="navbar--header">
      <Link to="/">
        <img src={logo} className="navbar--logo" alt="QtScraper logo" />{' '}
        QtScraper
      </Link>
    </div>
    <div className="navbar--auth">
      {isLoggedIn ? (
        <Button ghost onClick={onLogout}>
          로그아웃
        </Button>
      ) : (
        <Button ghost>
          <Link to={{ pathname: '/login', state: { from: location } }}>
            로그인
          </Link>
        </Button>
      )}
    </div>
  </header>
);
