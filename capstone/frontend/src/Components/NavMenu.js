import React from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

class NavMenu extends React.Component {
    render() {

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">
                    <img 
                        src="logo.png"
                        alt=""
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Tasker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#">Post a Task</Nav.Link>
                        <Nav.Link href="#">Browse Tasks</Nav.Link>
                        <Nav.Link href="#">Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavMenu;