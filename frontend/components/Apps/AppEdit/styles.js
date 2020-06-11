import styled from "styled-components";
import { Col } from "react-bootstrap";


export const FlexCol = styled(Col)`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
`;

export const SelectionContainer = styled("div")`
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0;
    align-items: flex-start;
    justify-content: flex-start
`

export const SelectedOption = styled("div")`
    padding: 3px 8px;
    min-width: 35px;
    border-radius: 25px;
    margin: 0 0 5px 5px;
    background-color: white;
    border: solid 2px;
    color: blueviolet;
    text-align: center
`

export const AvailableOption = styled("div")`
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    border: solid 2px grey;
`;