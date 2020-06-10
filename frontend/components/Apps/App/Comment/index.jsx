import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

import ReactStars from "react-stars";

import { PlusSymbol, DivCenterContent } from "../styles";

import { FiSend } from "react-icons/fi";

const FormatDate = (date) => {
    const dt = new Date(date);
    return `${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`;
};

export const BottomRightCorner = styled("div")`
    position: absolute;
    bottom: 0px;
    right: 5px;
    color: grey;
    font-size: 75%;
`;

export const DivFlexRight = styled("div")`
    display: flex;
    justify-content: flex-end;
    marginbottom: 6px;
    padding-bottom: 6px;
`;

const TimeStamp = (date) => {
    return <BottomRightCorner>{FormatDate(date)}</BottomRightCorner>;
};

const Comment = ({ app, setApp, msg }) => {
    const [showNewMessage, setShowNewMessage] = useState(false);
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState("");

    function sendRating({ appId, rating, comment }) {

        if (rating && comment) {
            axios
                .post("/api/apps/rate_app", { appId, rating, comment }, { withCredentials: true })
                .then((res) => {
                    setRating(null)
                    setComment("")
                    setShowNewMessage(false)
                    setApp(app => {
                        const updatedApp = {...app}
                        console.log(res)
                        console.log(res.data)
                        updatedApp.ratings.push(res.data.data)
                        console.log(updatedApp)
                        return updatedApp
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            {showNewMessage ? (
                <Row
                    className="z-depth-3"
                    style={{ border: "solid 1px grey", borderRadius: "12px", margin: "-5px", marginTop: "10px" }}
                >
                    <Col xs={12}>
                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <ReactStars count={5} size={24} value={rating} color2={"#ffd700"} onChange={setRating} />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <Form>
                            <Form.Group controlId="newComment">
                                <Form.Control
                                    style={{ width: "100%" }}
                                    as="textarea"
                                    multiple
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                />
                            </Form.Group>
                            <DivFlexRight>
                                <Button onClick={() => sendRating({ appId: app._id, rating, comment })}>
                                    Abschicken <FiSend />
                                </Button>
                            </DivFlexRight>
                        </Form>
                    </Col>
                </Row>
            ) : (
                <DivCenterContent>
                    <PlusSymbol
                        onClick={() => {
                            setShowNewMessage((showNewMessage) => !showNewMessage);
                        }}
                    />
                </DivCenterContent>
            )}
        </>
    );
};

export default Comment;
