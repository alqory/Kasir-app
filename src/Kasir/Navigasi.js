import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'

function Navigasi() {
    return (
        <div>
            <Navbar  variant="dark" expand="lg">
                <Container>
                <Navbar.Brand href="#home">Kasir App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/sukses">Sukses</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigasi
