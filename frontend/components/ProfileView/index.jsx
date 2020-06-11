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
            <DividerRow />
            <Row>
                <Col xs={12}>
                    <h3>Name: {user.name}</h3>
                </Col>
                <Col xs={12}>
                    <p>
                        {user.description ??
                            `Beschreibung: ${user.name} ist super, toller Lehrer. s finibus elit. Maecenas et pretium sem.
                        Proin faucibus leo at turpis pharetra, non rutrum dui eleifend. Mauris varius ante id justo
                        iaculis, vitae commodo risus congue. Pellentesque at augue et magna blandit euismod sed eget
                        enim. Donec in aliquet neque.`}
                    </p>
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
        </Container>
    );
};
export default ProfileView;
