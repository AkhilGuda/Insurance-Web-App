import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL POLICIES
        </NavLink>
      </li>
      <li>
        <NavLink to="/charts" exact>
          CHARTS
        </NavLink>
      </li>
      <li>
        <NavLink to="/policy/new">ADD POLICY</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
