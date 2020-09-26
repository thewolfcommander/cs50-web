import React from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import PostTask from './PostTask';
import BrowseTasks from './BrowseTasks';
import Profile from './Profile';

class NavMenu extends React.Component {
    render() {

        return (
            <Router>
                <Navbar bg="light" expand="lg">
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
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/post-a-task">Post a Task</Nav.Link>
                            <Nav.Link as={Link} to="/browse-tasks">Browse Tasks</Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/post-a-task" component={PostTask} />
                    <Route path="/browse-tasks" component={BrowseTasks} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </Router>
        );
    }
}

export default NavMenu;