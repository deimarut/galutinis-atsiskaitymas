import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundStyled = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    height: 97vh;
    background-image: linear-gradient(to right, rgba(169,51,127,255) , rgba(75,50,167,255));
`;

export const NotFound = () => {
    return <NotFoundStyled>
        <Link to="/"><img src='https://creativebonito.com/wp-content/uploads/2019/03/Error-404-2.png' alt=""/></Link>
    </NotFoundStyled>
}