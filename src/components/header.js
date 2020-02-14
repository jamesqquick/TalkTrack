import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => (
  <header>
    <nav id="navbar">
      <p id="brand">
        <Link to="/">{siteTitle}</Link>
      </p>
      <Link to="/addTalk">Add Talk</Link>
    </nav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

export default Header;
