import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundStyled = styled.div`
    align-items: center;
    display: flex;
    height: 97vh;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(216,76,126,255) ;
`;

export const NotFound = () => {
    return (
        <NotFoundStyled>
            <Link to="/" >
                <img src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png" alt="404 page" />
            </Link>
        </NotFoundStyled>
      );
    }

 
    
