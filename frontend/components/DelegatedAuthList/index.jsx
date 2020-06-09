import providerData from "./providerData";
import { Col } from "react-bootstrap";
import React from "react";

import { ImageDiv, ColoredDiv, MarginedRow } from "./styles.js";

const DelegatedAuthButton = ({ img, href, color }) => {
    const baseUrl = process.env.FRONT_END_URL
    return (
        <Col xs={2} onClick={() => (window.location = `${baseUrl}/api/${href}`)} style={{ padding: "5px" }}>
            <ColoredDiv color={color}>
                <ImageDiv img={`${baseUrl}/${img}`} color={color} />
            </ColoredDiv>
        </Col>
    );
};

const DelegatedAuthList = () => {
    return (
        <MarginedRow>
            {providerData.map(provider => {
                return <DelegatedAuthButton {...provider} key={provider.name} />;
            })}
        </MarginedRow>
    );
};

export default DelegatedAuthList;
