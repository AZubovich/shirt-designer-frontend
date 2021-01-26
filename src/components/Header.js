import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

function Header () {
  const history = useHistory();
  const currentUser = localStorage.getItem('currentUser');
  const logout = () => {
    localStorage.removeItem('currentUser');
    history.push('/login');
  }
  return (
    <div>
      <Navbar bg="dark" expand variant="dark">
        <Nav.Item>
          <Link to="/" className="btn btn-outline-light mr-3">Catalog</Link>
        </Nav.Item>
        { currentUser && (
          <Nav.Item>
            <Link to="/designer" className="btn btn-outline-light mr-3">Designer</Link>
          </Nav.Item>
        )}
        <Navbar.Collapse className="justify-content-end">
          { !currentUser && (
            <Nav.Item>
              <Link to="/login" className="btn btn-outline-light">Login</Link>
            </Nav.Item>
          )}
          { !currentUser && (
            <Nav.Item>
              <Link to="/signUp" className="btn btn-outline-light">Sign Up</Link>
            </Nav.Item>
          )}
          { currentUser && (
            <Nav.Item>
              <Button className="btn btn-outline-light" onClick={logout} >Logout</Button>
            </Nav.Item>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
