import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SelectionContainer, SelectionOption, StyledComment } from "./styles";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import UserProvider from "../../../contexts/UserProvider";

import Comment from "./Comment";
import ReactStars from "react-stars";

const Block = ({ label, content, type }) => {
    if (content) {
        return (
            <Row style={{ marginBottom: "10px" }}>
                <Col>
                    {type && type === "link" ? (
                        <Link href={content} prefetch={false}>
                            <a>
                                <h2>{label}</h2>
                            </a>
                        </Link>
                    ) : (
                        <>
                            <h2>{label}: </h2>
                            <p>{content}</p>
                        </>
                    )}
                </Col>
            </Row>
        );
    } else {
        return "";
    }
};

const BoolBlock = ({ label, content }) => {
    if (content) {
        return (
            <Row>
                <Col>
                    <h2>
                        {label}: {content ? "Ja" : "Nein"}
                    </h2>
                </Col>
            </Row>
        );
    } else {
        return "";
    }
};

const List = ({ label, content }) => {
    if (content.length > 0) {
        return (
            <Row>
                <Col xs={12}>
                    <h2>{label}: </h2>
                </Col>
                <Col>
                    <SelectionContainer>
                        {content.map((_) => {
                            return <SelectionOption key={_}>{_}</SelectionOption>;
                        })}
                    </SelectionContainer>
                </Col>
            </Row>
        );
    } else {
        return "";
    }
};

const App = ({ _id }) => {
    const router = useRouter();
    const [app, setApp] = useState(null);
    const { loggedInUserId } = useContext(UserProvider.context);

    useEffect(() => {
        if (_id) {
            axios
                .get(`/api/apps/${_id}`, { withCredentials: true })
                .then((res) => {
                    setApp(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [_id]);

    async function deleteComment(createdBy) {
        if (loggedInUserId === createdBy) {
            console.log("will delete");
            axios
                .post(`/api/apps/remove_rating`, { appId: app._id }, { withCredentials: true })
                .then((res) => {
                    setApp((app) => {
                        console.log(res.data.data);
                        const updatedApp = { ...app };
                        updatedApp.ratings = res.data.data;
                        return updatedApp;
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            {app ? (
                <>
                    <Row>
                        <Col xs={10}>
                            <b style={{ fontSize: "240%" }}>{app.name}</b>
                        </Col>
                        <Col xs={2} style={{ display: "flex", alignItems: "center" }}>
                            <Button onClick={() => router.push(`/apps/${router.query._id}/edit`)}>Edit</Button>
                        </Col>
                    </Row>
                    <Block label={"Beschreibung"} content={app.description} />
                    <Block label={"Webpage"} content={app.url} type="link" />
                    <Block label={"Erklärvideo"} content={app.explanationUrl} type="link" />
                    <List label={"Unterstützte Browser"} content={app.supportedBrowser} />
                    <List label={"App Typen"} content={app.appTypes} />
                    <List label={"Schul Typen"} content={app.schoolTypes} />
                    <List label={"Klassen"} content={app.subjects} />
                    <List label={"Anwendungsfälle"} content={app.useCase} />
                    <List label={"Lehrphasen"} content={app.teachingPhases} />
                    <List label={"Lehrmethoden"} content={app.didactics} />
                    {/* <BoolBlock label={"Erfordert Internet"} content={app.requiresInternet} />
                    <BoolBlock label={"Offlinenutzung möglich"} content={app.offlineModeAvailable} /> */}
                    <Row style={{ border: "solid 1px grey" }} />
                    <h1>Kommentare & Bewertungen:</h1>
                    <Comment app={app} setApp={setApp} />
                    <Row>
                        {app.ratings.map((rating) => (
                            <StyledComment className="z-depth-1" key={rating._id}>
                                <Row>
                                    <Col
                                        xs={12}
                                        style={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={rating.value}
                                            color2={"#ffd700"}
                                            edit={false}
                                        />
                                        <b style={{ alignItems: "center", display: "flex" }}>Von: {rating.byName}</b>
                                    </Col>
                                    <Col xs={12}>{rating.comment}</Col>
                                    <br />
                                </Row>
                                <Row style={{ marginBottom: "10px" }}>
                                    <Col xs={12}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row-reverse",
                                            }}
                                        >
                                            <Button onClick={() => deleteComment(rating.byId)}>Löschen</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </StyledComment>
                        ))}
                    </Row>
                </>
            ) : (
                "Not loaded"
            )}
        </>
    );
};

export default App;
