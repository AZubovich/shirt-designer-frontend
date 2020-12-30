import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function Header () {
  return (
    <div>
      <Navbar bg="dark" expand variant="dark">
        <Nav>
          <Nav.Item>
            <Link to="/" className="btn btn-outline-light mr-3">Catalog</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/designer" className="btn btn-outline-light mr-3">Designer</Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;
