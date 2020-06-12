import React from "react";
import Link from "next/link";
import { StyledFooter } from "./styles";

const Footer = () => {
    return (
        <StyledFooter sticky="bottom">
            <div style={{ float: "left" }}>© 2020 Copyright: Die Schulentwickler</div>
            <div style={{ float: "right", marginLeft: "auto" }}>
                <Link href="/imprint">
                    <a>Impressum</a>
                </Link>
                {" "}
                <Link href="/data_privacy">
                    <a>Datenschutzerklärung</a>
                </Link>
                {" "}
            </div>
        </StyledFooter>
    );
};

export default Footer;
