import { useContext, useState } from "react";
import { useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { UserContext } from "../../contexts/UserContextWrapper";
import { AttendeesList, AttendeesListItem, HoverOverlay, HoverDelete } from "./AttendeesStyle";
import { DateTime } from 'luxon';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState(''); 
    const [phone, setPhone] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setAttendees(data);
                }
                setIsLoading(false);
            });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAttendeesAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/attendees`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            },
            body: JSON.stringify({
                name, 
                surname, 
                email, 
                phone, 
                userId: user.id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.error) {
                setAttendees(data);
                setName('');
                setSurname('');
                setEmail('');
                setPhone('');
            }
        });
    }

    const handleDeleteItem = (id) => {
        if (window.confirm('Ar tikrai panaikinti sve??i???')) {
            fetch(`${process.env.REACT_APP_API_URL}/attendees/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
                }
            })
            .then(res => res.json())
            .then(data => {
                setAttendees(data);
            });
        }
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
                    placeholder="Pavard??" 
                    required 
                    onChange={(e) => setSurname(e.target.value)} 
                    value={surname}
                />
                <Input 
                    placeholder="Elektroninis pa??tas" 
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
                <Button >Prid??ti ?? sve??i?? s??ra????</Button>
            </form>

            {attendees.map((att) => (
                <AttendeesListItem key={att.id} >

                    <HoverOverlay>
                        <HoverDelete onClick={() => handleDeleteItem(att.id)}>NAIKINTI</HoverDelete>
                    </HoverOverlay>

                        <span>Vardas: {att.name}</span>
                        <span>Pavard??: {att.surname}</span>
                        <span>El. pa??tas: {att.email}</span>
                        <span>Tel. nr.: {att.phone}</span>
                        <span>U??registruota: 
                                ({DateTime.fromISO(att.timestamp).toFormat('yyyy - LL - dd')})
                        </span>
                </AttendeesListItem>
            ))}
        </AttendeesList>
    )
}
