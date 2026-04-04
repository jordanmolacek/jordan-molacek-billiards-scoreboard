import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>Billiards Scoreboard</h1>
      <div className="nav-links">
        <NavLink to="/ryan" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          vs Ryan
        </NavLink>
        <NavLink to="/other" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          vs Other
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
