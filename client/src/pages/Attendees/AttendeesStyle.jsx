import styled from 'styled-components';

export const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 25px;
    list-style: none;
`;

export const AttendeesListItem = styled.li`
    align-items: center;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;
    display: flex;
    font-family: Georgia, serif;
    justify-content: space-evenly;
    overflow: hidden;
    padding: 30px 30px;
`;

export const AttendeesID = styled.span`
    color: rgb(199, 123, 205);
    font-weight: bold;
`;