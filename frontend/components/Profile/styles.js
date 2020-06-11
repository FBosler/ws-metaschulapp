import styled from "styled-components";
import { Row } from "react-bootstrap";

import { FaUserFriends, FaUserAlt, FaPhone } from "react-icons/fa";
import { GoMail } from "react-icons/go"
import { GiHouseKeys } from "react-icons/gi"
import { MdDescription } from "react-icons/md"

export const ReferalSymbol = styled(FaUserFriends)`
    font-size: 160%;
`;

export const DescriptionSymbol = styled(MdDescription)`
    font-size: 160%;
`;

export const UserSymbol = styled(FaUserAlt)`
    font-size: 160%;
`;

export const PhoneSymbol = styled(FaPhone)`
    font-size: 160%;
`;

export const MailSymbol = styled(GoMail)`
    font-size: 160%;
`;

export const KeySymbol = styled(GiHouseKeys)`
    font-size: 160%;
`;

export const ResponsiveHeader4 = styled("h4")`
    padding: 20px 0 0 0;
`;

export const MarginedRow = styled(Row)`
    padding: 5px 0px;
`;
