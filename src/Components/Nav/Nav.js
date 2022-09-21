import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import HeaderLink from "./HeaderLink/HeaderLink";

import logo from "../../images/icons/123.png";
import cart from "../../images/icons/cart-sm.png";

function Navigation() {
  return (
    <div className="nav-wrapper fixed-top navbar navbar-toggleable-sm navbar-expand-md">
      <div className="container">
        <Navbar className="w-100" collapseOnSelect expand="lg" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand href="/">
            <img src={logo} alt="dog" width="47px" />
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-justified w-100 nav-fill">
              <Nav.Link></Nav.Link>

              <Nav.Link className="nav-link" href="/map">
                Map
              </Nav.Link>
              <Nav.Link></Nav.Link>
              <Nav.Link href="/predict">A I</Nav.Link>
              <Nav.Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Navigation;
