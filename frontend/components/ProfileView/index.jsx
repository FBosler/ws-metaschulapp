import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { DividerRow } from "../styles";
import { ResponsiveHeader4 } from "../Profile/styles";

import { SendSymbol } from "./styles";

import ShareButtons from "../ShareButtons";

const ProfileView = ({ id }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/user/${id}`, { withCredentials: true })
                .then((res) => {
                    setUser(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    return (
        <Container>
            {user.name ? (
                <>
                    <Row>
                        <Col xs={12}>
                            <h3>Name: {user.name}</h3>
                        </Col>
                        <Col xs={12}>
                            <p>{user.description}</p>
                        </Col>
                        <Col xs={12} style={{ marginBottom: "10px" }}>
                            <Button>
                                Nachricht schicken! <SendSymbol />
                            </Button>
                        </Col>
                    </Row>
                    <DividerRow />
                    <ResponsiveHeader4>
                        Teile das Profil von <b>{user.name}</b>
                    </ResponsiveHeader4>
                    <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                        <div style={{ margin: "auto", maxWidth: "600px" }}>
                            <ShareButtons />
                        </div>
                    </Row>
                </>
            ) : (
                "Du musst dich einloggen, um die Profile anderer Nutzer zu sehen und ihnen Nachrichten zu schicken"
            )}
        </Container>
    );
};
export default ProfileView;
