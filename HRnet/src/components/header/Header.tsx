import React from "react";
import Nav from "../../components/nav/Nav";
import logo from "../../assets/logo.jpg"
import "./header.css"

  
function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="WealthHealth Logo" />
      </div>
      <Nav/>
    </header>
  );
}

export default Header;