import styled from 'styled-components';

const InputStyled = styled.input`
    border-radius: 10px;
    border: 1px solid rgb(199, 123, 205);
    font-size: 18px;
    padding: 10px 20px;
    font-family: Georgia, serif;
    margin-left: 10px ;
    margin-right: 10px ;
`;

export const Input = ({ ...props }) => {
    return <InputStyled {...props}/>
}