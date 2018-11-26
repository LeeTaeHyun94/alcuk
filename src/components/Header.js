import React, { Component } from 'react';
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

class Header extends Component {
    render () {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">ALCUK</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            Problem
                        </NavItem>
                        <NavItem eventKey={2} href="/board">
                            Board
                        </NavItem>
                        <NavItem eventKey={3} href="#">
                            Contact
                        </NavItem>
                        {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">*/}
                        {/*<MenuItem eventKey={3.1}>Action</MenuItem>*/}
                        {/*<MenuItem eventKey={3.2}>Another action</MenuItem>*/}
                        {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
                        {/*<MenuItem divider />*/}
                        {/*<MenuItem eventKey={3.3}>Separated link</MenuItem>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            LOGIN
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;
