import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LandingBackground, PaddedCol, ResponsiveHeader2, FullRow } from "./styles";
import SignupLoginModal from "../SignupLoginModal";

import Link from "next/link";

// const URL = "https://cdn.pixabay.com/photo/2014/05/18/19/15/lecture-hall-347316_1280.jpg";
const URL = "/assets/images/background.jpg";

const Landing = () => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <LandingBackground className={"z-depth-5"} url={URL}>
                <FullRow>
                    <PaddedCol xs={{ span: 10, offset: 1 }} sm={{ span: 5, offset: 1 }}>
                        <ResponsiveHeader2>Die Metaapp für Learning Apps</ResponsiveHeader2>
                    </PaddedCol>
                </FullRow>
                <SignupLoginModal show={show} setShow={setShow} />
            </LandingBackground>

            <Container>
                <div>
                    <h2>Warum haben wir uns für diese Herausforderung entschieden?</h2>

                    <p>
                        "One solution fits all" ist Schnee von gestern. Viele Lehrer*innen und Schulleiter*innen stehen
                        vor ähnlichen Herausforderungen für den hybriden Schulbetrieb, einige haben schon Lösungen
                        gefunden, andere kämpfen noch mit ganz einfachen Problemen. Die Zahl der Lösungen am Markt ist
                        endlos und viele sind davon überfordert oder fühlen sich von Behörden im Stich gelassen. Da
                        wollen wir helfen.
                    </p>

                    <h2>Was ist aus unserer Sicht das größte Problem, das es hier zu lösen gibt?</h2>

                    <p>
                        Viele Schulleiter*innen und Lehrer*innen haben den Eindruck, dass sie allein mit dem Problem
                        sind und wissen oft nicht, wo sie anfangen sollen.
                    </p>

                    <h2>Wer ist von dieser Problemstellung betroffen?</h2>

                    <p>
                        Betroffen sind in erster Linie Schulleiter*innen und Lehrer*innen, die den Unterricht anders
                        strukturieren müssen. Natürlich sind davon auch Schüler*innen und Eltern betroffen, die nicht
                        wissen, wie sie am besten zur Veränderung beitragen können.
                    </p>

                    <h2>Lösungsbeschreibung:</h2>

                    <h2>Was ist unser Lösungsansatz?</h2>

                    <p>Wir schaffen eine Plattform, die</p>

                    <ul>
                        <li>bestehende Apps und Tools vorstellt und Bewertungen ermöglicht</li>
                        <li>Erfahrungsberichte und Rezepte (Testimonials) von anderen Schulen bereitstellt</li>
                        <li>
                            mittels einer ChatBot-basierten Abfrage hilfe-suchende Schulleiter*innen und Lehrer*innen
                            beim Finden von Lösungskonzepten unterstützt
                        </li>
                    </ul>

                    <h2>Von welchen Annahmen wir bei unserem Lösungsansatz aus?</h2>

                    <p>
                        Wir gehen davon aus, dass es schon viele Schulen gibt, die sich gerne auf den Weg in die
                        digitale Welt machen würden und einen Überblick mit Erfahrungen und Bewertungen von anderen
                        haben möchten.
                    </p>

                    <h2>Wer profitiert von dieser Lösung? Wer nutzt diese Lösung?</h2>

                    <p>
                        Im ersten Schritt wird die Lösung von Lehrer*innen und Schulleiter*innen eingesetzt, um schnell
                        einen Überblick über Tools und passende Lösungskonzepte zu finden und sich in einer Community
                        auszutauschen. Im nächsten Schritt sollen auch Schüler*innen und Eltern Zugriff bekommen, um die
                        Tools zu bewerten, Probleme aufzuzeigen und bei Lösungen zu unterstützen. Für Anbieter von
                        Lösungen, Apps oder IT- / Coaching-Dienstleistungen kann die Plattform eine gute Möglichkeit
                        sein, sich und die eigenen Produkte vorzustellen.
                    </p>

                    <h2>Welchen Einfluss hat die Lösung auf die aktuelle Situation?</h2>

                    <p>Sie bringt Licht ins Dunkel und zeigt auf</p>

                    <ul>
                        <li>was es schon alles gibt</li>
                        <li>wer es schon nutzt und </li>
                        <li>welche Erfahrungen bei der Einführung bzw. Umstellung gemacht wurden</li>
                    </ul>

                    <p>Sie kann dabei helfen, die Fehler, die andere schon gemacht haben zu vermeiden.</p>

                    <h2>Was ist der langfristige Wert der Lösung?</h2>

                    <p>
                        Sie schafft Transparenz über Angebote und Lösungsmöglichkeiten in einer sich ständig
                        verändernden Welt. Sie schafft eine Community von Schulleiter*innen, Lehrer*innen,
                        Schüler*innen, Elter, Dienstleister*innen, Behörden und Ministerien, um gemeinsam Probleme zu
                        diskutieren und Lösungen zu erarbeiten.{" "}
                    </p>

                    <p>
                        Auf lange Frist stellen wir uns vor, dass auch Lerninhalte für Präsenz- und Onlineunterricht,
                        synchron und asynchron ausgetauscht und weiterentwickelt werden.
                    </p>

                    <h2>Wie bewerten wir selbst die Umsetzbarkeit und Skalierbarkeit unserer Lösung?</h2>

                    <p>
                        Die Plattform ist aus unserer Sicht schnell umgesetzt. Es gibt bereits Plattformen, die Apps,
                        Tools oder Spiele bewerten und Communities dazu anbieten. Diese Konzepte lassen sich kopieren
                        und in den Schulkontext übertragen.
                    </p>

                    <p>
                        Die Plattform ist unabhängig vom Bundesland und der Schulart und kann mit entsprechender
                        Sichtbarkeit schnell skalieren. Die ersten Inhalte werden von uns erstellt, um die ersten
                        Benutzer "anzulocken". Dauerhaft werden die Inhalte durch die Community entstehen.
                    </p>

                    <h1>Vorgehen und Fortschritt:</h1>

                    <p>
                        Wie ist der Lösungsansatz entstanden? Was waren die wichtigsten Meilensteine während der
                        Hackathon Woche? Wenn Ihr auf einer bestehenden Lösung aufgebaut habt: bitte beschreibt den
                        Status am Anfang des Hackathons, so dass wir den Fortschritt während der Woche angemessen
                        beurteilen können. Prototyp:
                    </p>

                    <p>
                        Wenn vorhanden: Wo finden wir Euren ersten Prototypen (Link)? Wenn vorhanden: Wo finden wir den
                        Code zu Eurer ersten Lösung (Link)? Alternativ: Wie könnte die kleinste nutzbare Version Eurer
                        Lösung aussehen? Nächste Schritte:
                    </p>

                    <p>
                        Wie testet ihr Eure Annahmen? Was ist aus Eurer Sicht der nächste Schritt in Richtung Umsetzung?
                        Was benötigt Ihr für den nächsten Schritt (Ressourcen, Know-How, Budget)? Seid ihr als
                        Projektteam selbst an der Umsetzung interessiert? Wenn ja, wer hat welche Rolle in Eurem Team?
                    </p>
                </div>{" "}
                <Row>
                    <Col xs={4}>
                        <Link href="https://devpost.com/software/die-schulentwickler" prefetch={false}>
                            <a>DevPost</a>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Landing;
