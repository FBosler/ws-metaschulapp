import React, { useContext, useState } from "react";
import UserProvider from "../../contexts/UserProvider";
import _ from "lodash";

import { Nav, NavDropdown, Button } from "react-bootstrap";

import SignupLoginModal from "../SignupLoginModal";

import { StyledNav } from "./styles";

const Navbar = () => {
    const baseUrl = process.env.FRONT_END_URL;

    const [show, setShow] = useState(false);

    const { user } = useContext(UserProvider.context);

    const contextUserData = useContext(UserProvider.context)

    const Logout = !_.isEmpty(user?.data?._id) && (
        <Button
            onClick={() => {
                contextUserData.logout();
                setShow(false)
            }}
        >
            Logout
        </Button>
    );

    const Login = _.isEmpty(user?.data) && (
        <div>
            <Button onClick={() => setShow(true)}>Login</Button>

            <SignupLoginModal show={show} setShow={setShow} />
        </div>
    );

    return (
        <StyledNav sticky="top">
            <StyledNav.Brand href="/">
                <img alt="company logo" src="/assets/icons/logo192.png" width="30" height="30" className="d-inline-block align-top" />
            </StyledNav.Brand>
            
            <StyledNav.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                        <NavDropdown.Item href={`${baseUrl}/profile`}>Profil</NavDropdown.Item>
                        <NavDropdown.Item href={`${baseUrl}/overview`}>Übersicht</NavDropdown.Item>
                        <NavDropdown.Item href={`${baseUrl}/successstories`}>Erfolgsgeschichten</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <span style={{marginRight:"auto",marginLeft:"auto",fontSize:"130%"}}><b>Deutschlands größte Schulappübersicht</b></span>
                {Logout}
                {Login}
            </StyledNav.Collapse>
        </StyledNav>
    );
};

export default Navbar;
