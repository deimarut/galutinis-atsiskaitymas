import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email, 
                name, 
                surname,
                password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            navigate('/login');
        });
    };

    return (
        <>
            <form onSubmit={handleRegister}>
                <input 
                    placeholder="El. paštas" 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input 
                    placeholder="Vardas"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input 
                    placeholder="Pavardė"
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                />
                <input 
                    placeholder="Slaptažodis" 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button>Prisiregistruoti</button>
            </form>
            <Link to="/login">Jau turite paskyrą? Prisijunkite</Link>
        </>
       
    )
}