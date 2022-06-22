import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar, NavLink } from 'react-bootstrap';


const Header = (props) => {
    const { id, userName, balance } = props;
    return (
        <>
            <Navbar bg="light" expand="lg" className="" style={{ marginBottom: "30px", top: "0", width: "100%", fontWeight: "bold" }}>

                <img src="https://www.nudgeglobalimpactchallenge.com/assets/uploads/2018/09/Untitled-design-91.png" alt="" className="img-fluid"
                    style={{
                        width: "10rem",
                        marginLeft: "2rem"
                    }}
                />
                <Container>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink href="/home" active className="text-black">Stocks</NavLink>
                            <NavLink href="/home" active className="text-black">Profile</NavLink>
                        </Nav>
                        {(userName && <Nav>
                            <Nav.Link >{userName}</Nav.Link>
                            <Nav.Link disabled href="#memes">
                                {balance + "$"}
                            </Nav.Link>
                        </Nav>
                        )}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;