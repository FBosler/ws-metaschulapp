import styled from "styled-components";
import { Row } from "react-bootstrap";

export const device = {
    sm: `@media (min-width: 575.98px)`,
    md: `@media (min-width: 767.98px)`,
    lg: `@media (min-width: 991.98px)`,
    xl: `@media (min-width: 1199.98px)`,
};


export const DividerRow = styled(Row)`
    border-bottom: 1px solid dimgrey;
    -webkit-box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12),
        0 11px 15px -7px rgba(0, 0, 0, 0.2);
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12),
        0 11px 15px -7px rgba(0, 0, 0, 0.2);
`;

export const CenteredDiv = styled("div")`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

export const Bold = styled("b")`
    font-size: 100% ${device.md} {
        font-size: 110%;
    }
    ${device.lg} {
        font-size: 130%;
    }
`;

export const SmallItallic = styled("i")`
    color: lightgrey;
    fontsize: 80%;
`;

export const FormulaSizeSmall = styled("div")`
    font-size: 100%;
    ${device.md} {
        font-size: 180%;
    }
`;

export const FormulaSize = styled("div")`
    font-size: 130%;
    ${device.md} {
        font-size: 200%;
    }
`;

export const CenteredOnRightBorder = styled("div")`
    margin: 0;
    position: absolute;
    top: 50%;
    right: 0px;
    -ms-transform: translate(+50%, -50%);
    transform: translate(+50%, -50%);
`;

export const CenteredOnLeftBorder = styled("div")`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 0px;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;