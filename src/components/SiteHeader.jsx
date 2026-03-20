/* eslint-disable react/prop-types */

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import { brand, navigation } from "../siteData";

function NavItem({ item }) {
  return (
    <Nav.Link
      as={NavLink}
      to={item.to}
      end={item.to === "/"}
      className={({ isActive }) =>
        `site-nav__link${item.cta ? " site-nav__link--cta" : ""}${
          isActive ? " active" : ""
        }`
      }
    >
      {item.label}
    </Nav.Link>
  );
}

export default function SiteHeader() {
  return (
    <Navbar expand="lg" className="site-header" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="site-brand">
          <OptimizedImage
            src="/images/Scales.png"
            alt={`${brand.name} logo`}
            className="site-brand__logo"
            loading="eager"
            fetchPriority="high"
          />
          <span>{brand.name}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="site-navbar" />
        <Navbar.Collapse id="site-navbar">
          <Nav className="ms-auto align-items-lg-center">
            <NavDropdown title="About Us" id="site-nav-about" className="site-nav__dropdown">
              {navigation.about.map((item) => (
                <NavDropdown.Item
                  key={item.to}
                  as={NavLink}
                  to={item.to}
                  className="site-nav__dropdown-item"
                >
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            {navigation.primary.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
