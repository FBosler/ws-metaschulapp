import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

import { StyledErrorMessage, StyledLabel, StyledSelect } from "./styles";

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
                <Form.Label>{label}</Form.Label>
                <Form.Control as="select" multiple onChange={(e) => handleChange(e, controlId)}>
                    {mapOptions(options)}
                </Form.Control>
            </Form.Group>
        </Col>
    );
};

// And now we can use these
const Filter = ({ filterSettings, setFilterSettings }) => {
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
            <Form>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Group controlId="name">
                            <Form.Label>App Name:</Form.Label>
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
                    <MultiSelect
                        filterSettings={filterSettings}
                        controlId="subjects"
                        handleChange={handleChange}
                        label="Fächer"
                        options={SUBJECTS}
                    />
                    <MultiSelect
                        filterSettings={filterSettings}
                        controlId="schoolTypes"
                        handleChange={handleChange}
                        label="Schultyp"
                        options={SCHOOLTYPES}
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
                </Row>
            </Form>
        </>
    );
};

export default Filter;
