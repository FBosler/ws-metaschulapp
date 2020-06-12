import React from "react";
import { Container } from "react-bootstrap";

const Impressum = () => {
    return (
        <Container>
            <h1>
                <b>ES HANDELT SICH BEI DER METASCHULAPP AUSDRÜCKLICH UM EINEN PROTOTYPEN</b>
            </h1>
            <h3>
                Diese Page dient nur zu Veranschaulichung dessen, wie eine reale Seite aussehen könnte und wurde im
                Rahmen des #wirfürschule Hackathons zu demnonstrationszwecken erstellt.
            </h3>
            <p>
                <b>Anbieter:</b> Fabian Bosler
            </p>
            <p>
                <b>Anschrift:</b> ....
            </p>
            <p>
                <b>Tel.:</b> Bitte per Mail kontaktieren
            </p>
            <p>
                <b>E-Mail:</b> FBosler+ViTeach@gmail.com
            </p>
            <p>
                <b>EU-Streitschlichtung:</b>
            </p>
            <p>
                Die Europäische Kommission hat unter
                <a href="ec.europa.eu/consumers/odr/”>ec.europa.eu/consumers/odr/"> ODR Europe </a>
                eine europäische Online-Streitbeilegungsplattform (OS-Plattform) errichtet. Die OS-Plattform können
                Verbraucher für die außergerichtliche Beilegung von Streitigkeiten mit einem in der EU niedergelassenen
                Unternehmen nutzen. An Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle nehmen wir
                nicht teil.
            </p>
        </Container>
    );
};

export default Impressum;
