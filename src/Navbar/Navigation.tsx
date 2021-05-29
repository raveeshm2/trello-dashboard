import React from 'react';
import { Navbar } from 'react-bootstrap';

interface NavigationProps { }

export const Navigation: React.FC<NavigationProps> = () => {
    return (
        <Navbar className="justify-content-center" bg="dark" variant="dark" expand="md">
            <Navbar.Brand href="#home" >Trello Dasboard</Navbar.Brand>
        </Navbar>
    );
}