import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuth0 } from '../utils/auth';

const Header = ({ siteTitle }) => {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  return (
    <header>
      <nav id="navbar">
        <p id="brand">
          <Link to="/">{siteTitle}</Link>
        </p>
        <div className="nav-items">
          {isAuthenticated && (
            <>
              <Link to="/addTalk" className="nav-item">
                Add Talk
              </Link>
              <button className="linkBtn nav-item" onClick={logout}>
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <button
              className="linkBtn nav-item"
              onClick={() =>
                loginWithRedirect({ appState: `${window.location.pathname}` })
              }
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

export default Header;
