import { useState } from "react";
import { useEffect } from "react";
import { API_URL, LOGGED_IN_USER } from "../../constants/constants";
import styled from 'styled-components';

const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 25px;
    list-style: none;
`;

const AttendeesListItem = styled.li`
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-evenly;
    overflow: hidden;
    padding: 10px 30px;
    font-family: Georgia, serif;
    white-space: nowrap;
    overflow: hidden;
    flex-grow: 3;
    text-overflow: ellipsis;
`;

const AttendeesID = styled.span`
    color: rgb(199, 123, 205);
    font-weight: bold;
`;

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);

    useEffect(() => {
        fetch(`${API_URL}/attendees?userId=${LOGGED_IN_USER.id}`)
            .then(res => res.json())
            .then(data => {
                setAttendees(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AttendeesList>
            {attendees.map((att) => (
                <AttendeesListItem key={att.id}>
                    <AttendeesID>Eilės numeris: {att.id}</AttendeesID>
                        <span>Vardas: {att.name}</span>
                        <span>Pavardė: {att.surname}</span>
                        <span>El. paštas: {att.email}</span>
                        <span>Tel. nr.: {att.phone}</span>
                </AttendeesListItem>
            ))}
        </AttendeesList>
    );
}