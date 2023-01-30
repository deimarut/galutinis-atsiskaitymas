import { Link } from "react-router-dom";
import styled from "styled-components";

export const LoginTitle = styled.h1`
    text-align: center;
    font-family: Georgia, serif;
    margin: 0;
    padding: 20px 0;
    background-image: linear-gradient(to right, rgb(199, 123, 205) , white);
`;


export const FormStyled = styled.form`
    background-color: white;
    border: 1px solid rgb(102, 0, 102);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    padding: 15px;
    font-family: Georgia, serif;
`;

export const LoginContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    background-image: linear-gradient(to right, rgb(199, 123, 205) , white);
    height: 87vh; 
    overflow: hidden;
`;

export const LinkStyled = styled(Link)`
    align-self: center;
    font-family: Georgia, serif;
    text-decoration: none;
    :hover{
        color: rgb(255, 128, 191);
    } 
`;