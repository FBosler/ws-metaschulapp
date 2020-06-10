import React, { useState, useEffect } from "react";
import axios from "axios";
import { SelectionContainer, SelectionOption, StyledComment } from "./styles";
import { Row, Col } from "react-bootstrap";

import Comment from "./Comment";
import ReactStars from "react-stars";

const Block = ({ label, content }) => {
    return (
        <Row>
            <Col>
                <h2>{label}: </h2>
                <p>{content}</p>
            </Col>
        </Row>
    );
};

const BoolBlock = ({ label, content }) => {
    return (
        <Row>
            <Col>
                <h2>
                    {label}: {content ? "Ja" : "Nein"}
                </h2>
            </Col>
        </Row>
    );
};

const List = ({ label, content }) => {
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
};

const App = ({ _id }) => {
    const [app, setApp] = useState(null);

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

    return (
        <>
            {app ? (
                <>
                    <Row>
                        <Col xs={12}>
                            <b style={{ fontSize: "240%" }}>{app.name}</b>
                        </Col>
                    </Row>
                    <Block label={"Beschreibung"} content={app.description} />
                    <Block label={"Webpage"} content={app.url} />
                    <List label={"Unterstützte Browser"} content={app.supportedBrowser} />
                    <List label={"App Typen"} content={app.appTypes} />
                    <List label={"Schul Typen"} content={app.schoolTypes} />
                    <List label={"Klassen"} content={app.subjects} />
                    <List label={"Anwendungsfälle"} content={app.useCase} />
                    <List label={"Lehrphasen"} content={app.teachingPhases} />
                    <List label={"Lehrmethoden"} content={app.didactics} />
                    {/* <BoolBlock label={"Erfordert Internet"} content={app.requiresInternet} />
                    <BoolBlock label={"Offlinenutzung möglich"} content={app.offlineModeAvailable} /> */}
                    <Row style={{border:"solid 1px grey"}}/>
                    <h1>Kommentare & Bewertungen:</h1>
                    <Comment appId={app._id} />
                    <Row>
                        {app.ratings.map((rating) => (
                            <>
                                <StyledComment className="z-depth-1">
                                    <div
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
                                    </div>
                                    {rating.comment}
                                    <br />
                                </StyledComment>
                            </>
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
