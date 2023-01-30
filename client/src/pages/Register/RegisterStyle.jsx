import { Link } from "react-router-dom";
import styled from "styled-components";

export const FormStyled = styled.form`
    background-color: white;
    border: 1px solid rgb(102, 0, 102);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    padding: 15px;
`;

export const RegisterContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    background-image: linear-gradient(to right, rgb(199, 123, 205) , white);
    margin: auto;
    height: 97vh; 
    overflow: hidden;
    font-family: Georgia, serif;
`;

export const LinkStyled = styled(Link)`
    align-self: center;
    text-decoration: none;  
    :hover{
        color: rgb(255, 128, 191);
    } 
`;
