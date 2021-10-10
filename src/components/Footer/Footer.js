import React from 'react';
import './Footer.css';
import {
  Container,
  Navbar,
  NavbarBrand
} from 'reactstrap';

const Footer = () => {
  return (
    <div className="fixed-bottom">
      <Navbar color="dark" dark>
        <Container>
          <NavbarBrand>CrudAPI Mision Tic -  Carlos Duque</NavbarBrand>
        </Container>
      </Navbar>
    </div>
  )

};

export default Footer;
