import styled from 'styled-components';

const ButtonStyled = styled.button`
    background-color: rgb(199, 123, 205) ;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px 20px;
    border: 1px solid rgb(102, 0, 102);
    cursor: pointer;
    font-family: Georgia, serif;
`;

export const Button = (props) => {
    return <ButtonStyled {...props}/>
}