import { NavLink } from "react-router-dom";
import React from "react";
const Nav = () => {

    
    return (
        <nav className="nav">
                <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" >Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/employee-list" className="nav-link" >Employees list</NavLink>
                
                </li>
               
                </ul>
        </nav>
   );
};
export default Nav;