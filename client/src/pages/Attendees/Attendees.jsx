import { useState } from "react";
import { useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { LOGGED_IN_USER } from "../../constants/constants";
import { AttendeesID, AttendeesList, AttendeesListItem } from "./style";

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState(''); 
    const [phone, setPhone] = useState('');

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

    const handleAttendeesAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/attendees`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, 
                surname, 
                email, 
                phone, 
                userId: LOGGED_IN_USER.id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setAttendees(data);
            setName('');
            setSurname('');
            setEmail('');
            setPhone('');
        });
    }

    return (
        <AttendeesList>
            <form onSubmit={handleAttendeesAdd}>
                <Input 
                    placeholder="Vardas" 
                    required 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                />
                <Input 
                    placeholder="Pavardė" 
                    required 
                    onChange={(e) => setSurname(e.target.value)} 
                    value={surname}
                />
                <Input 
                    placeholder="Elektroninis paštas" 
                    type="email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input 
                    placeholder="Telefono numeris 370..." 
                    required 
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                />
                <Button >Pridėti į svečių sąrašą</Button>
            </form>

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