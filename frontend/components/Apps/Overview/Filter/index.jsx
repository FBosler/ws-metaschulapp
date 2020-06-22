import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import { SCHOOLTYPES, CLASSES, SUBJECTS, USECASE, FOCUSGROUP, APPTYPES } from "./options";

const mapOptions = (selected, arr) => {
    return (
        <>
            {arr.map((_) => (
                <option key={_}>
                    {_}
                </option>
            ))}
        </>
    );
};

const MultiSelect = ({ filterSettings, controlId, label, options, handleChange }) => {
    return (
        <Col xs="auto">
            <Form.Group controlId={controlId}>
                <Form.Label>
                    <span style={{ fontWeight: "bolder" }}>{label}</span>
                </Form.Label>
                <Form.Control as="select" multiple onChange={(e) => handleChange(e, controlId)} value={filterSettings[controlId]}>
                    {mapOptions(filterSettings[controlId], options)}
                </Form.Control>
            </Form.Group>
        </Col>
    );
};

const FILTERS = [ "subjects", "schoolTypes", "classes", "useCase", "focusesOn", "appTypes" ];

// And now we can use these
const Filter = ({ filterSettings, setFilterSettings }) => {
    const [showFilter, setShowFilter] = useState(true);

    const handleChange = (e, targetField) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        setFilterSettings((settings) => {
            const newSettings = { ...settings };
            newSettings[targetField] = selected ?? [];
            return newSettings;
        });
    };

    const resetFilter = () => {
        setFilterSettings(Object.fromEntries(FILTERS.map(_ => [_, []])));

        /* setFilterSettings((settings) => {
            const newSettings = { ...settings };
            for (let i = 0;i < 6;i++){
                newSettings[FILTERS[i]] = [];
            }
            return newSettings;
        } );*/
    }


    return (
        <>
            {showFilter ? (
                <Form>
                    <Row className="align-items-center" style={{ paddingTop: "15px" }}>
                        <MultiSelect
                            filterSettings={filterSettings}
                            controlId="schoolTypes"
                            handleChange={handleChange}
                            label="Schultyp"
                            options={SCHOOLTYPES}
                        />
                        <MultiSelect
                            filterSettings={filterSettings}
                            controlId="subjects"
                            handleChange={handleChange}
                            label="Fächer"
                            options={SUBJECTS}
                        />
                        <MultiSelect
                            filterSettings={filterSettings}
                            controlId="classes"
                            handleChange={handleChange}
                            label="Klassen"
                            options={CLASSES}
                        />
                        <MultiSelect
                            filterSettings={filterSettings}
                            controlId="useCase"
                            handleChange={handleChange}
                            label="Anwendungsgebiete"
                            options={USECASE}
                        />
                        <MultiSelect
                            filterSettings={filterSettings}
                            controlId="focusesOn"
                            handleChange={handleChange}
                            label="Ausgerichtet auf:"
                            options={FOCUSGROUP}
                        />
                        <MultiSelect
                            filterSettings={filterSettings}
                            controlId="appTypes"
                            handleChange={handleChange}
                            label="App Typen:"
                            options={APPTYPES}
                        />
                        <Col xs="auto">
                            <Form.Group controlId="name">
                                <Form.Label>
                                    <span style={{ fontWeight: "bolder" }}>Oder Du kennst den Namen sogar schon?</span>
                                </Form.Label>
                                <Form.Control
                                    value={filterSettings.name}
                                    onChange={(e) => {
                                        e.persist();
                                        setFilterSettings((settings) => {
                                            const newSettings = { ...settings };
                                            newSettings.name = e.target.value ?? "";
                                            return newSettings;
                                        });
                                    }}
                                    type="text"
                                    placeholder="Hier Name eingeben"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button onClick={resetFilter}>Filter zurücksetzen</Button>
                            <Button onClick={() => setShowFilter((showFilter) => !showFilter)}>
                                Filter Einklappen
                            </Button>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <div
                    onClick={() => setShowFilter((showFilter) => !showFilter)}
                    style={{ paddingTop: "20px", paddingBottom: "10px"}}
                >
                    <h1 style={{fontWeight: "bolder" }}>Du weißt noch gar nicht, was du suchst?</h1>
                    <span style={{fontSize:"150%"}}>-> Kein Problem, einfach <span style={{ color: "blue", fontWeight: "900" }}>hier</span> klicken.</span>
                </div>
            )}
        </>
    );
};

export default Filter;
