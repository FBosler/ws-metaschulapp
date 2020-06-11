import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import { SCHOOLTYPES, CLASSES, SUBJECTS, USECASE } from "./options";

const mapOptions = (arr) => {
    return (
        <>
            {arr.map((_) => (
                <option key={_} value={_}>
                    {_}
                </option>
            ))}
        </>
    );
};

const MultiSelect = ({ controlId, label, options, handleChange }) => {
    return (
        <Col xs="auto">
            <Form.Group controlId={controlId}>
                <Form.Label>
                    <span style={{ fontWeight: "bolder" }}>{label}</span>
                </Form.Label>
                <Form.Control as="select" multiple onChange={(e) => handleChange(e, controlId)}>
                    {mapOptions(options)}
                </Form.Control>
            </Form.Group>
        </Col>
    );
};

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

    return (
        <>
            {showFilter ? (
                <Form>
                    <Row className="align-items-center" style={{paddingTop:"15px"}}>
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
                            <Button onClick={() => setShowFilter((showFilter) => !showFilter)}>
                                Filter Einklappen
                            </Button>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <h2 onClick={() => setShowFilter((showFilter) => !showFilter)}>
                    Für Filtermöglichkeiten <span style={{ color: "blue", fontWeight: "900" }}>hier</span> klicken
                </h2>
            )}
        </>
    );
};

export default Filter;
