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
                    <h1>Problembeschreibung:</h1>

                    <h2>Warum haben wir uns für diese Herausforderung entschieden?</h2>

                    <p>
                        “One solution fits all” ist Schnee von gestern. Viele Lehrer*innen und Schulleiter*innen stehen
                        vor ähnlichen Herausforderungen für den hybriden Schulbetrieb. Einige haben schon Lösungen
                        gefunden, andere kämpfen noch mit ganz einfachen Problemen.{" "}
                    </p>

                    <p>
                        Die Zahl der Lösungen am Markt ist endlos und viele sind davon überfordert oder fühlen sich von
                        Behörden im Stich gelassen. Da wollen wir helfen.
                    </p>

                    <h2>Was ist aus unserer Sicht das größte Problem, das es hier zu lösen gibt?</h2>

                    <p>
                        Viele Schulleiter*innen und Lehrer*innen haben den Eindruck, dass sie{" "}
                        <strong>allein mit dem Problem</strong> sind und wissen oft nicht, wo sie anfangen sollen.
                    </p>

                    <h2>Wer ist von dieser Problemstellung betroffen?</h2>

                    <p>
                        Betroffen sind in erster Linie <strong>Schulleiter*innen und Lehrer*innen</strong>, die den
                        Unterricht anders strukturieren müssen. Natürlich sind davon auch{" "}
                        <strong>Schüler*innen und Eltern</strong> betroffen, die nicht wissen, wie sie am Besten zur
                        Veränderung beitragen können.
                    </p>

                    <h1>Lösungsbeschreibung:</h1>

                    <h2>Was ist unser Lösungsansatz?</h2>

                    <p>Wir schaffen eine Plattform, die</p>

                    <ul>
                        <li>
                            bestehende Apps und Tools vorstellt und <strong>Bewertungen</strong> ermöglicht
                        </li>
                        <li>
                            <strong>Erfahrungsberichte und Rezepte</strong> von anderen Schulen bereitstellt
                        </li>
                        <li>
                            mittels einer <strong>ChatBot</strong>-basierten Abfrage hilfe-suchende Schulleiter*innen
                            und Lehrer*innen beim Finden von Lösungskonzepten unterstützt
                        </li>
                    </ul>

                    <h2>Von welchen Annahmen wir bei unserem Lösungsansatz aus?</h2>

                    <p>
                        Wir gehen davon aus, dass es schon viele Schulen gibt, die sich gerne auf den Weg in die
                        digitale Welt machen. Ihnen würden ein Überblick über Erfahrungen und Bewertungen von anderen
                        helfen.
                    </p>

                    <h2>Wer profitiert von dieser Lösung? Wer nutzt diese Lösung?</h2>

                    <p>
                        Im ersten Schritt wird die Lösung von <strong>Lehrer*innen und Schulleiter*innen</strong>{" "}
                        eingesetzt, um schnell einen Überblick über Tools und passende Lösungskonzepte zu finden und
                        sich in einer Community auszutauschen.{" "}
                    </p>

                    <p>
                        Natürlich sollen auch <strong>Schüler*innen und Eltern</strong> Zugriff haben, um die Tools zu
                        bewerten, Probleme aufzuzeigen und bei Lösungen zu unterstützen.{" "}
                    </p>

                    <p>
                        Für <strong>Anbieter*innen von Lösungen, Apps oder IT- / Coaching-Dienstleistungen</strong> kann
                        die Plattform eine gute Möglichkeit sein, sich und die eigenen Produkte vorzustellen.
                    </p>

                    <p>
                        Und zu guter Letzt, können auch <strong>Entscheider*innen</strong> davon profitieren, wenn sie
                        verstehen, was gut funktioniert, oder wo noch etwas benötigt wird.
                    </p>

                    <h2>Welchen Einfluss hat die Lösung auf die aktuelle Situation?</h2>

                    <p>Sie bringt Licht ins Dunkel und zeigt auf</p>

                    <ul>
                        <li>was es schon alles gibt</li>
                        <li>wer es schon nutzt und</li>
                        <li>welche Erfahrungen bei der Einführung bzw. Umstellung gemacht wurden</li>
                    </ul>

                    <p>
                        Sie kann dabei helfen, die Fehler, die andere schon gemacht haben zu vermeiden und neue Wege zu
                        entdecken.
                    </p>

                    <h2>Was ist langfristig der Mehrwert unserer Lösung?</h2>

                    <p>
                        Sie schafft <strong>Transparenz über Angebote und Lösungsmöglichkeiten</strong> in einer sich
                        ständig verändernden Welt. Sie schafft eine Community von Schulleiter*innen, Lehrer*innen,
                        Schüler*innen, Eltern, Dienstleister*innen, Behörden und Ministerien, um gemeinsam Probleme zu
                        diskutieren und Lösungen zu erarbeiten.
                    </p>

                    <p>
                        Auf lange Frist stellen wir uns vor, dass{" "}
                        <strong>auch Lerninhalte/-materialien für Präsenz- und Onlineunterricht</strong>, synchron und
                        asynchron ausgetauscht und weiterentwickelt werden.
                    </p>

                    <h2>Wie bewerten wir selbst die Umsetzbarkeit und Skalierbarkeit unserer Lösung?</h2>

                    <p>
                        Die Plattform ist aus unserer Sicht schnell umgesetzt. Es gibt bereits Plattformen, die Apps,
                        Tools oder Spiele bewerten und Communities für andere Themenbereiche dazu anbieten.{" "}
                    </p>

                    <p>Diese Konzepte lassen sich kopieren und in den Schulkontext übertragen.</p>

                    <p>
                        Die Plattform ist <strong>unabhängig vom Bundesland und der Schulart</strong> und kann mit
                        entsprechender Sichtbarkeit schnell skalieren. Die ersten Inhalte werden von uns erstellt, um
                        die ersten Benutzer “anzulocken”.{" "}
                    </p>

                    <p>Dauerhaft werden die Inhalte durch die Community entstehen.</p>

                    <h1>Vorgehen und Fortschritt:</h1>

                    <p>
                        In Slack trafen sich viele, die ähnliche Ideen hatten, welches Tool oder welche App den die
                        beste Lösung aus ihrer Sicht wären. Einige waren auf der Suche, nach den richtigen Tools oder
                        Lösungen.
                    </p>

                    <p>
                        Schnell wurde uns klar, dass es an einer Übersicht mangelt, was es gibt, wer es wofür einsetzt
                        und was Einzelne für Erfahrungen damit gemacht haben.
                    </p>

                    <p>
                        Eine der ersten Ideen war: Wir brauchen etwas wie{" "}
                        <Link href="http://www.boardgamegeek.com" prefetch={false}>
                            <a rel="nofollow">www.boardgamegeek.com</a>
                        </Link>
                        für Schul-Apps. Eine Plattform, auf der viele Apps und Bewertungen aus der Praxis / Community zu
                        finden sind. Sie muss gut sortiert und einfach durch-suchbar sein.
                    </p>

                    <h2>Unsere Meilensteine</h2>

                    <ol>
                        <li>Viele Menschen mit individuellen Problemen oder Ideen - "eigentlich war noch nix da"</li>
                        <li>Sammeln von Problembeschreibungen und Ideen</li>
                        <li>Konkretisierung der Idee und einer Vision</li>
                        <li>
                            Bilden eines interdisziplinären / multiprofessionellen Teams: Schulleiter*innen,
                            Lehrer*innen, Eltern, Schüler*innen, IT-Freaks und Projekt-Nerds
                        </li>
                        <li>Entwurf der ersten Prototyp-Ideen</li>
                        <li>
                            Umsetzung des Prototypen:{" "}
                            <Link href="/" prefetch={false}>
                                <a>www.metaschulapp.de</a>
                            </Link>
                        </li>
                        <li>
                            Umsetzung einer Website:{" "}
                            <Link href="http://www.die-schulentwickler.de" prefetch={false}>
                                <a>www.die-schulentwickler.de</a>
                            </Link>
                        </li>
                        <li>Einführen eines ChatBots: Fridolin</li>
                        <li>
                            Erstellen unseres Pitch-Videos:{" "}
                            <Link href="https://youtu.be/wqWJHWcPHo8" prefetch={false}>
                                <a>https://youtu.be/wqWJHWcPHo8</a>
                            </Link>
                        </li>
                        <li>Feinschliff und Abgabe DevPost</li>
                    </ol>

                    <h2>Was haben wir erreicht?</h2>

                    <p>
                        Wir haben ein MVP umgesetzt, d.h. eine Plattform, die bereits Kommentare für Apps verarbeiten
                        kann und einen ChatBot, der die ersten Fragen beantwortet.
                    </p>

                    <h2>Wie soll es weitergehen?</h2>

                    <ul>
                        <li>Werbung über Social Media Channels</li>
                        <li>weiterer Ausbau der Plattform</li>
                        <li>
                            Funktionalitäten: Verbesserung des ChatBots, Handling von Erfahrungsberichten, gute
                            Community-Funktionen, etc.
                        </li>
                    </ul>

                    <h2>Was wir brauchen?</h2>

                    <ul>
                        <li>Hosting</li>
                        <li>Entwicklung</li>
                        <li>Marketing</li>
                    </ul>

                    <h2>Wollen wir weitermachen?</h2>

                    <p>JA KLAR!</p>
                </div>
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
