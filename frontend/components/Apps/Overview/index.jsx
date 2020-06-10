import React, { useState, useEffect } from "react";
import axios from "axios";
import { SelectionContainer, SelectionOption } from "./styles";
import { Row, Col, Card, CardColumns } from "react-bootstrap";
import Link from "next/link";
import ReactStars from "react-stars";

const App = ({ app }) => {
    return (
        <Col xs={6} md={4} style={{ paddingLeft: "5px", paddingRight: "5px", marginBottom: "5px" }}>
            <Card style={{ width: "100%" }} key={app._id}>
                <Card.Body>
                    <Card.Title style={{marginBottom:"5px"}}>
                        <b>{app.name}</b>
                    </Card.Title>{" "}
                    <ReactStars count={5} size={24} value={4} color2={"#ffd700"} edit={false} />
                    <SelectionContainer>
                        {app.useCase.map((_) => {
                            if (_ === "Unterrichtsdurchführung") {
                                return <SelectionOption key={_}>Im Unterricht</SelectionOption>;
                            } else if (_ === "Unterrichtsvorbereitung") {
                                return <SelectionOption key={_}>Vorbereitung</SelectionOption>;
                            }
                            return <SelectionOption key={_}>{_}</SelectionOption>;
                        })}
                    </SelectionContainer>
                    <Link href={`../apps/${app._id}`} prefetch>
                        <a>Details</a>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

const Overview = () => {
    const [apps, setApps] = useState(null);

    useEffect(() => {
        axios
            .get(`/api/apps/all`, { withCredentials: true })
            .then((res) => {
                setApps(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {apps ? (
                <Row>
                    {apps.map((_) => (
                        <App app={_} key={_._id}/>
                    ))}
                </Row>
            ) : (
                <Card>stuff</Card>
            )}
        </>
    );
};

export default Overview;
