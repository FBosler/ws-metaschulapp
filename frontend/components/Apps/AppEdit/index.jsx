import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlexCol, SelectedOption, AvailableOption } from "./styles";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";

import {
    SCHOOLTYPES,
    CLASSES,
    BROWSERS,
    DIDACTICS,
    SUBJECTS,
    USECASE,
    APPTYPES,
    TEACHINGPHASES,
} from "../Overview/Filter/options.js";

const DisplayMultiSelect = ({ label, targetField, currSelection, availableOptions, handleMultiSelect }) => {
    return (
        <>
            <Col>
                <h2>{label}: </h2>
            </Col>
            {currSelection.length > 0 ? (
                <FlexCol xs={12}>
                    Ausgewählt:{" "}
                    {currSelection.map((param) => (
                        <SelectedOption
                            key={param}
                            onClick={(e) => {
                                e.persist();
                                handleMultiSelect({ value: e.target.innerText, targetField, mode: "removal" });
                            }}
                        >
                            {param}
                        </SelectedOption>
                    ))}
                </FlexCol>
            ) : (
                ""
            )}
            {availableOptions.filter((_) => !currSelection.includes(_)).length > 0 ? (
                <FlexCol xs={12}>
                    Nicht ausgewählt:{" "}
                    {availableOptions
                        .filter((_) => !currSelection.includes(_))
                        .map((param) => (
                            <AvailableOption
                                key={param}
                                onClick={(e) => {
                                    e.persist();
                                    handleMultiSelect({ value: e.target.innerText, targetField, mode: "addition" });
                                }}
                            >
                                {param}
                            </AvailableOption>
                        ))}
                </FlexCol>
            ) : (
                ""
            )}
        </>
    );
};

const LabelAndInput = ({ label, value, handleChange, updateTarget, rows = 1 }) => (
    <Row style={{ marginBottom: "10px" }}>
        <Form.Label column xs="2">
            {label}
        </Form.Label>
        <Col xs={10}>
            <Form.Control
                as="textarea"
                rows={rows}
                type="text"
                value={value}
                onChange={(e) => handleChange(e.target.value, updateTarget)}
            />
        </Col>
    </Row>
);

const AppEdit = ({ _id }) => {
    const [app, setApp] = useState(undefined);
    const router = useRouter();

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

    const handleMultiSelect = ({ value, targetField, mode }) => {
        const tmpApp = { ...app };
        if (!tmpApp[targetField]) {
            tmpApp[targetField] = [];
        }
        if (mode === "removal") {
            tmpApp[targetField] = tmpApp[targetField].filter((_) => _ !== value);
        } else {
            tmpApp[targetField].push(value);
        }
        setApp(tmpApp);
    };

    const handleChange = (value, targetField) => {
        const tmpApp = { ...app };
        tmpApp[targetField] = value;
        setApp(tmpApp);
    };

    const handleSubmission = () => {
        router.push(`${router.asPath}/..`);
        if (_id) {
            axios
                .post(`/api/apps/update`, { app }, { withCredentials: true })
                .then(() => {
                    router.push(`${router.asPath}/..`);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            {app ? (
                <>
                    <Row>
                        <Col xs={12}>
                            <b style={{ fontSize: "240%" }}>{app.name}</b>
                        </Col>
                    </Row>
                    <LabelAndInput
                        label="Beschreibung:"
                        value={app.description || ""}
                        handleChange={handleChange}
                        updateTarget={"description"}
                        rows={5}
                    />
                    <LabelAndInput
                        label="Webpage:"
                        value={app.url || ""}
                        handleChange={handleChange}
                        updateTarget="url"
                    />
                    <LabelAndInput
                        label="Erklärvideo:"
                        value={app.explanationUrl || ""}
                        handleChange={handleChange}
                        updateTarget="explanationUrl"
                    />
                    <DisplayMultiSelect
                        label={"Unterstützte Browser"}
                        targetField={"supportedBrowser"}
                        currSelection={app.supportedBrowser}
                        availableOptions={BROWSERS}
                        handleMultiSelect={handleMultiSelect}
                    />
                    <DisplayMultiSelect
                        label={"App Typen"}
                        targetField={"appTypes"}
                        currSelection={app.appTypes}
                        availableOptions={APPTYPES}
                        handleMultiSelect={handleMultiSelect}
                    />
                    <DisplayMultiSelect
                        label={"Schul Typen"}
                        targetField={"schoolTypes"}
                        currSelection={app.schoolTypes}
                        availableOptions={SCHOOLTYPES}
                        handleMultiSelect={handleMultiSelect}
                    />
                    <DisplayMultiSelect
                        label={"Fächer"}
                        targetField={"subjects"}
                        currSelection={app.subjects}
                        availableOptions={SUBJECTS}
                        handleMultiSelect={handleMultiSelect}
                    />
                    <DisplayMultiSelect
                        label={"Klassen"}
                        targetField={"classes"}
                        currSelection={app.classes}
                        availableOptions={CLASSES}
                        handleMultiSelect={handleMultiSelect}
                    />
                    <DisplayMultiSelect
                        label={"Anwendungsmöglichkeiten"}
                        targetField={"useCase"}
                        currSelection={app.useCase}
                        availableOptions={USECASE}
                        handleMultiSelect={handleMultiSelect}
                    />
                    <DisplayMultiSelect
                        label={"Lehrphasen"}
                        targetField={"teachingPhases"}
                        currSelection={app.teachingPhases}
                        availableOptions={TEACHINGPHASES}
                        handleMultiSelect={handleMultiSelect}
                    />
                    <DisplayMultiSelect
                        label={"Lehrmethoden"}
                        targetField={"didactics"}
                        currSelection={app.didactics}
                        availableOptions={DIDACTICS}
                        handleMultiSelect={handleMultiSelect}
                    />
                    {/* <BoolBlock label={"Erfordert Internet"} content={app.requiresInternet} />
                    <BoolBlock label={"Offlinenutzung möglich"} content={app.offlineModeAvailable} /> */}
                    <Row>
                        <Col xs={{ span: 2, offset: 10 }} style={{ display: "flex", alignItems: "center" }}>
                            <Button onClick={() => handleSubmission()}>Speichern</Button>
                        </Col>
                    </Row>
                </>
            ) : (
                "Not loaded"
            )}
        </>
    );
};

export default AppEdit;
