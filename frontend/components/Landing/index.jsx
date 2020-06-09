import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
    LandingBackground,
    PaddedCol,
    ResponsiveHeader2,
    FullRow,
} from "./styles";
import SignupLoginModal from "../SignupLoginModal";

const URL = "https://cdn.pixabay.com/photo/2014/05/18/19/15/lecture-hall-347316_1280.jpg"

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
                Stuff
            </Container>
        </div>
    );
};

export default Landing;
