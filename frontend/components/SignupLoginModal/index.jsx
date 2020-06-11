import React, { useState, useContext } from "react";
import { Modal, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import UserProvider from "../../contexts/UserProvider";
import DelegatedAuthList from "../DelegatedAuthList";

import { useRouter } from 'next/router'

import {
    PaddedContainer,
    EmailSymbol,
    PasswordSymbol,
    ResponsiveHeader4,
    MutedSpan,
    VerticalCenterWrapper,
    SubmitButtom
} from "./styles";

const SignUpLoginForm = () => {
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const contextUserData = useContext(UserProvider.context);
    const referralCode = sessionStorage.getItem("referralCode");

    const onSubmit = e => {
        e.preventDefault();

        const userData = {
            email,
            password,
            referralCode 
        };
        axios
            .post("/api/auth/register_login", userData)
            .then(res => {
                contextUserData.updateUserState();
                router.push(`/overview`);
            })
            .catch(err => {
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Row>
                    <Form.Label column xs="2" sm="1">
                        <EmailSymbol />
                    </Form.Label>
                    <Col xs="10" sm="11">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Row>
                    <Form.Label column xs="2" sm="1">
                        <PasswordSymbol />
                    </Form.Label>
                    <Col xs="10" sm="11">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Row>
                    <Col xs="2" sm="1">
                        <Form.Check type="checkbox" />
                    </Col>
                    <Col xs="10" sm="11">
                        <Form.Label>
                            <MutedSpan>
                                I hereby confirm that the referral app is allowed to send me emails, up until I
                                unsuscribe
                            </MutedSpan>
                        </Form.Label>
                    </Col>
                </Row>
            </Form.Group>
            <VerticalCenterWrapper>
                <SubmitButtom type="submit">Submit</SubmitButtom>
            </VerticalCenterWrapper>
        </Form>
    );
};

const SignupLoginModal = props => {
    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Sign up / Login</Modal.Title>
            </Modal.Header>
            <PaddedContainer>
                <ResponsiveHeader4>With email:</ResponsiveHeader4>
                <br />
                <SignUpLoginForm />
                <Row style={{ borderBottom: "1px solid #dee2e6" }} />
                <DelegatedAuthList />
            </PaddedContainer>
        </Modal>
    );
};

export default SignupLoginModal;
