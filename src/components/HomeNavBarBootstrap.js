import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export class HomeNavBarPage extends React.Component {
    
    render() {
        return (
            <div>
                <Navbar className="Navbar-bg" bg="light" variant="light" expand="lg">
                    <Nav href="/" className="center-navbar">Temple Management</Nav>
                </Navbar>
            </div>
        )
    }
}