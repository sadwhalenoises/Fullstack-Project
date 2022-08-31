import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><img src='https://upload.wikimedia.org/wikipedia/commons/2/2a/LoL_icon.svg' 
            alt=''
            width='30'
            height='30'/>
            </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Matches</Nav.Link>
            <Nav.Link>Mastery</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation