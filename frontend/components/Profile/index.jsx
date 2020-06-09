import React, { useState, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import UserProvider from "../../contexts/UserProvider";

import { DividerRow } from "../styles";

import ShareButtons from "../ShareButtons";

import { ReferalSymbol, UserSymbol, MailSymbol, PhoneSymbol, KeySymbol,  ResponsiveHeader4, MarginedRow } from "./styles";


const Profile = () => {
    const { user, setUser, updateUserBackend } = useContext(UserProvider.context);

    const [referrals, setReferrals] = useState(0);
    const [typingTimeoutFunction, setTypingTimeoutFunction] = useState(null);

    // listens for user to stop typing
    const onChange = (e, targetField) => {
        e.preventDefault();
        let _user = user.data;

        if (targetField.includes(".")) {
            _user[targetField.split(".")[0]][targetField.split(".")[1]] = e.target.value
        } else {
            _user[targetField] = e.target.value;
        }
        setUser({ data: _user, errors: {} });
        
        if (typingTimeoutFunction) {
            clearTimeout(typingTimeoutFunction);
            setTypingTimeoutFunction(typingTimeoutFunction);
        }

        const newTypingTimeoutFunction = setTimeout(() => {
            updateUserBackend()
        }, 3000);
        setTypingTimeoutFunction(newTypingTimeoutFunction);
    };

    const inputField = (symbol, placeholder, targetField) => {
        return (
            <MarginedRow>
                <Col xs="2" sm="1">
                    <Form.Label>
                        {symbol}
                    </Form.Label>
                </Col>
                <Col xs="10" sm="11">
                    <Form.Control
                        id={targetField}
                        type="text"
                        placeholder={placeholder}
                        onChange={(e) => onChange(e, targetField)}
                    />
                </Col>
            </MarginedRow>
        )
    }

    return (
        <Container>
            <DividerRow />
            <div style={{ maxWidth: "600px", margin: "auto", color: "lightgrey" }}>
                <ResponsiveHeader4>User Data:</ResponsiveHeader4>
                <Form>
                    <Form.Group>
                        {inputField(<UserSymbol />, user?.data?.name || "Name", "name")}
                        {inputField(<MailSymbol />, user?.data?.email, "email")}
                        {inputField(<PhoneSymbol />, user?.data?.phoneNumber || "No Number yet", "phoneNumber")}
                        {inputField(<KeySymbol />, user?.data?.permissions?.role || "No role yet", "permissions.role")}
                    </Form.Group>
                </Form>
            </div>
            <DividerRow />
            <ResponsiveHeader4>Share the message easily!</ResponsiveHeader4>
            <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <div style={{ margin: "auto", maxWidth: "600px" }}>
                    <ShareButtons />
                </div>
            </Row>
        </Container>
    );
};
export default Profile;
