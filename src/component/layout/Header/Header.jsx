import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {AiOutlineSearch }from 'react-icons/ai'
import {FiShoppingBag }from 'react-icons/fi'
import {HiOutlineUserCircle }from 'react-icons/hi'
import { Link } from 'react-router-dom';
import  logo  from "../../../images/logo.png";



function Head() {
  return (
    <>
    <Navbar bg="light" expand="lg"  style={{height: '70px'}}>
      <Container className='p-0'>
        <Navbar.Brand href="#home">
          <img src={logo} alt="" srcset="" height="100px" width="200px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="">
              <Link className='link' to="/home">Home</Link>
            </Nav.Link>
            <Nav.Link href="">
            <Link className='link' to="/products">Product</Link>
            </Nav.Link>
            <Nav.Link href="">
            <Link className='link' to="/contact">Contact</Link>
            </Nav.Link>
            <Nav.Link href="">
            <Link className='link' to="/about">About</Link>
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
     
        <Navbar.Collapse className="justify-content-end gap-3"  >
        <Nav.Link href="/search">
             < AiOutlineSearch />
            </Nav.Link>
            <Nav.Link href="/cart">
              <FiShoppingBag />
            </Nav.Link>
            <Nav.Link href="/login">
            <HiOutlineUserCircle />
            </Nav.Link>
        </Navbar.Collapse>
    
      </Container>
    </Navbar>
    </>
  );
}

export default Head;



