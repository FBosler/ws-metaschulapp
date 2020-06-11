import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlexCol, SelectionContainer, SelectedOption, AvailableOption } from "./styles";
import { Row, Col } from "react-bootstrap";

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
                        return <SelectedOption key={_}>{_}</SelectedOption>;
                    })}
                </SelectionContainer>
            </Col>
        </Row>
    );
};

const DisplayMultiSelect = ({ label, targetField, currSelection, availableOptions, handleMultiSelect }) => {
    return (
        <>
            <Col>
                <h2>{label}: </h2>
            </Col>
            <FlexCol xs={12}>
                Ausgewählt:
                {currSelection
                    ? currSelection.map((param) => (
                          <SelectedOption
                              key={param}
                              onClick={(e) => {
                                  e.persist();
                                  handleMultiSelect({ value: e.target.innerText, targetField, mode: "removal" });
                              }}
                          >
                              {param}
                          </SelectedOption>
                      ))
                    : ""}
            </FlexCol>
            <FlexCol xs={12}>
                Nicht ausgewählt:{" "}
                {availableOptions
                    ? availableOptions
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
                          ))
                    : ""}
            </FlexCol>
        </>
    );
};

const AppEdit = ({ _id }) => {
    const [app, setApp] = useState(undefined);

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
                        label={"Klassen"}
                        targetField={"subjects"}
                        currSelection={app.subjects}
                        availableOptions={SUBJECTS}
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
                    <Row style={{ border: "solid 1px grey" }} />
                </>
            ) : (
                "Not loaded"
            )}
        </>
    );
};

export default AppEdit;
