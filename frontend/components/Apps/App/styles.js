import { FaPlusSquare } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

export const SelectionContainer = styled("div")`
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0;
    align-items: flex-start;
    justify-content: flex-start
`

export const SelectionOption = styled("div")`
    padding: 3px 8px;
    min-width: 35px;
    border-radius: 25px;
    margin: 0 0 5px 5px;
    background-color: white;
    border: solid 2px;
    color: blueviolet;
    text-align: center
`

export const PlusSymbol = styled(AiOutlineMessage)`
    font-size: 300%;
    margin: 20px 0px;
`;

export const DivCenterContent = styled("div")`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export const StyledComment = styled(Col)`
    position: relative;
    border-radius: 6px;
    background-color: #f9ef8c;
    margin: 15px;
    border: solid 1px grey
`;