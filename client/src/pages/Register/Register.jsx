import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { FormStyled, RegisterContainer, LinkStyled } from "./RegisterStyle";

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
        <RegisterContainer>
            <FormStyled onSubmit={handleRegister}>
                <h1>Registracija naujiems vartotojams</h1>
                    <Input 
                        placeholder="El. paštas" 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Input 
                        placeholder="Vardas"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <Input 
                        placeholder="Pavardė"
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                    />
                    <Input 
                        placeholder="Slaptažodis" 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                <Button>Registruotis</Button>
            <LinkStyled to="/login">Jau turite paskyrą? Prisijunkite</LinkStyled>
            </FormStyled>
        </RegisterContainer>
       
    )
}