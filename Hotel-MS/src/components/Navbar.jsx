import { useState } from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : ""}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : ""}
              >
                Book a Room
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : ""}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">HOMEO</NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : ""}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : ""}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : ""}
            >
              Book a Room
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : ""}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-4">
        {isLoggedIn ? (
          <button className="btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <NavLink to="/signup" className="btn">Sign Up</NavLink>
            <NavLink to="/login" className="btn">Login</NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
