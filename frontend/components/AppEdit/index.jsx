import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import { StyledErrorMessage, StyledLabel, StyledSelect } from "./styles";

const numberArray = (min, max, step = 1) => Array.from(new Array(max - min + 1), (x, i) => i * step + min);

const SUBJECTS = [
    "Biologie",
    "Chemie",
    "Informatik",
    "Englisch",
    "Französisch",
    "Geographie",
    "Deutsch",
    "Geschichte",
    "Latein",
    "Mathematik",
    "Musik",
    "Physik",
];

const SCHOOLTYPES = ["Grundschule", "Hauptschule", "Gymnasium", "Realschule", "Gesamtschule"];

const GRADES = numberArray(1, 12).map((_) => String(_));

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

const TextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
};

const TextArea = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
};

const Checkbox = ({ children, ...props }) => {
    // We need to tell useField what type of input this is
    // since React treats radios and checkboxes differently
    // than inputs/select/textarea.
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
};

const Select = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
            <StyledSelect {...field} {...props} />
            {meta.touched && meta.error ? <StyledErrorMessage>{meta.error}</StyledErrorMessage> : null}
        </>
    );
};

// And now we can use these
const SignupForm = () => {
    const classes = numberArray(1, 12);
    return (
        <Container>
            <h1>Hier App Eintragen</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    acceptedTerms: false, // added for our checkbox
                    jobType: "", // added for our select
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
                    lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
                    email: Yup.string().email("Invalid email address").required("Required"),
                    acceptedTerms: Yup.boolean()
                        .required("Required")
                        .oneOf([true], "You must accept the terms and conditions."),
                    jobType: Yup.string()
                        .oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
                        .required("Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <TextInput label="App Name" name="name" type="text" placeholder="" />
                            <TextInput label="Webpage" name="url" type="text" placeholder="" />
                            <TextArea label="Beschreibung" name="description" type="textarea" rows={3} placeholder="" />
                        </Col>
                        <Col xs="auto">
                            <select multiple label="Fächer" name="subjects">
                                <option value="">Bitte geeigneten Schultypen auswählen:</option>
                                {mapOptions(SCHOOLTYPES)}
                            </select>
                            <select multiple label="Klassen" name="grade">
                                <option value="">Bitte geeignete Klassen auswählen:</option>
                                {mapOptions(GRADES)}
                            </select>
                            <select multiple label="Fächer" name="subjects">
                                <option value="">Bitte geeigneten Fächer auswählen:</option>
                                {mapOptions(SUBJECTS)}
                            </select>
                        </Col>
                        <Col>
                            <Checkbox name="acceptedTerms">I accept the terms and conditions</Checkbox>

                            <button type="submit">Submit</button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </Container>
    );
};

export default SignupForm;
