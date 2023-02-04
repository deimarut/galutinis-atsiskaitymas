import styled from 'styled-components';

export const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 25px;
    list-style: none;
`;

export const HoverOverlay = styled.div`
    background-color: rgba(248, 193, 248, 0.4);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
    display: flex ;
    align-items: center ;
    justify-content: flex-start ;
`;

export const HoverDelete = styled.div`
    color: red;
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
`;

export const HoverEdit = styled.div`
    color: red;
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
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
    position: relative;

    ${HoverOverlay} {
        visibility: hidden;
    }

    &:hover {
        ${HoverOverlay} {
            visibility: visible;
    }
    }
`;

export const AttendeesID = styled.span`
    color: rgb(199, 123, 205);
    font-weight: bold;
`;