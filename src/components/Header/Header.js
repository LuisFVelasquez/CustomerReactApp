import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import './Header.css';

const Header = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  if (!user) {
    return (
      <div>
        <h5>Crud API</h5>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Brand</NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/Login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/register">Signup</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    </div>
    );
  } else {
    return (
      <div>
        <h5>Crud API</h5>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Brand</NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/users">Usuarios</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    </div>
    );
  }
};

Header.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

export default Header;
