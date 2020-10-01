import React from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

class NavMenu extends React.Component {

    render() {

        return (
            <Navbar sticky="top" bg="light" variant="light" expand="lg">
                <Navbar.Brand as={Link} to="/">
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
                {
                    localStorage.getItem('token') &&
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/post-task">Post a Task</Nav.Link>
                        <Nav.Link as={Link} to="/tasks">Browse Tasks</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <Nav.Link as={Link}
                                  to="/" 
                                  onClick={() => localStorage.removeItem('token')}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavMenu;