import React, { useState, useEffect } from "react";
import axios from "axios";
import { SelectionContainer, SelectionOption } from "./styles";
import { Row, Col, Card } from "react-bootstrap";
import { useRouter } from "next/router";
import ReactStars from "react-stars";

import { DividerRow } from "../../styles";

import Filter from "./Filter";

const App = ({ app, router }) => {
    return (
        <Col xs={6} md={4} style={{ paddingLeft: "5px", paddingRight: "5px", marginBottom: "5px" }}>
            <Card style={{ width: "100%" }} key={app._id} onClick={() => router.push(`/../apps/${app._id}`)}>
                <Card.Body style={{ padding: "0.5rem 1.25rem" }}>
                    <Card.Title style={{ marginBottom: "5px" }}>
                        <b>{app.name}</b>
                    </Card.Title>{" "}
                    {app.overallRating ? (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <ReactStars count={5} size={24} value={app.overallRating} color2={"#ffd700"} edit={false} />
                            <div>({app.numberOfRatings})</div>
                        </div>
                    ) : (
                        "Noch keine Bewertungen"
                    )}
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
                </Card.Body>
            </Card>
        </Col>
    );
};

const filterMatching = ({ apps, applicableFilter, field }) => {
    if (applicableFilter.length > 0) {
        const res = [...apps.filter((app) => app[field].filter((_) => applicableFilter.includes(_)).length > 0)];
        return res;
    } else {
        return apps;
    }
};

const Overview = ({query}) => {
    const router = useRouter();
    const [apps, setApps] = useState(null);
    const [filteredApps, setFilteredApps] = useState(apps);
    const [filterSettings, setFilterSettings] = useState({
        name: "",
        subjects: [],
        schoolTypes: [],
        classes: [],
        useCase: [],
    });


    useEffect(() => {
        setFilterSettings({
            name: "",
            subjects: query.subjects ?? [],
            schoolTypes: query.schoolTypes ?? [],
            classes: query.classes ?? [],
            useCase: query.useCase ?? [],
        })
    }, [query])

    useEffect(() => {
        axios
            .get(`/api/apps/all`, { withCredentials: true })
            .then((res) => {
                let {
                    data: { data: receivedApps },
                } = res;
                receivedApps = receivedApps.sort((a, b) => {
                    const a_val = a.numberOfRatings ?? -100;
                    const b_val = b.numberOfRatings ?? -100;
                    return b_val - a_val;
                });
                setApps(receivedApps);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (apps) {
            const { name, subjects, schoolTypes, classes, useCase } = filterSettings;
            let filteredApps = [...apps];
            if (name) {
                filteredApps = [...filteredApps.filter((app) => app.name.toLowerCase().includes(name.toLowerCase()))];
            }

            filteredApps = filterMatching({ apps: filteredApps, applicableFilter: subjects, field: "subjects" });
            filteredApps = filterMatching({ apps: filteredApps, applicableFilter: schoolTypes, field: "schoolTypes" });
            filteredApps = filterMatching({ apps: filteredApps, applicableFilter: classes, field: "classes" });
            filteredApps = filterMatching({ apps: filteredApps, applicableFilter: useCase, field: "useCase" });

            filteredApps = filteredApps.sort((a, b) => {
                const a_val = a.numberOfRatings ?? -100;
                const b_val = b.numberOfRatings ?? -100;
                return b_val - a_val;
            });

            setFilteredApps(filteredApps);
        }
    }, [apps, filterSettings]);

    return (
        <>
            <Filter {...{ filterSettings, setFilterSettings }} />
            <DividerRow style={{marginBottom: "10px"}}/>
            {filteredApps ? (
                <Row style={{ marginLeft: "-5px", marginRight: "-5px" }}>
                    {filteredApps.map((_) => (
                        <App app={_} router={router} key={_._id} />
                    ))}
                </Row>
            ) : (
                <Row>
                    <Col>Bitte einloggen, um eine Übersicht der vorhanden Apps zu sehen</Col>
                </Row>
            )}
        </>
    );
};

export default Overview;
