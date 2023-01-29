import { useState } from "react";
import { useEffect } from "react";
import { LOGGED_IN_USER } from "../../constants/constants";
import { AttendeesID, AttendeesList, AttendeesListItem } from "./style";

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${LOGGED_IN_USER.id}`)
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