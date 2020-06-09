import React from "react";
import Link from "next/link";
import { StyledFooter } from "./styles";

const Footer = () => {
    return (
        <StyledFooter sticky="bottom">
            <div style={{ float: "left" }}>© 2020 Copyright: Fabian Bosler</div>
            <div style={{ float: "right", marginLeft: "auto" }}>
                <Link href="/about">
                    <a>About</a>
                </Link>
                {" "} 
                <Link href="/imprint">
                    <a>Impressum</a>
                </Link>
                {" "}
                <Link href="/data_privacy">
                    <a>Datenschutzerklärung</a>
                </Link>
                {" "}
                <Link href="/terms_and_conditions">
                    <a>Geschäftsbedingungen</a>
                </Link>
            </div>
        </StyledFooter>
    );
};

export default Footer;
