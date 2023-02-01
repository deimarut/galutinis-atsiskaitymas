import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { FormStyled, RegisterContainer, LinkStyled, ErrorStyled } from "./RegisterStyle";

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault(e);
        setIsLoading(true);
        
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
        .then((res) => {
            if (res.status === 400) {
                throw new Error('Toks vartotojas jau registruotas');
            } 

            if (!res.ok) {
                throw new Error('Kažkas negerai');
            }

            return res.json();
        })
        .then((data) => {
            navigate('/login');
            setIsLoading(false);
            setError('');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    };

    return (
        <RegisterContainer>
            <FormStyled onSubmit={handleRegister} disabled={isLoading} column >
                <h1>Registracija naujiems vartotojams</h1>
                    <Input 
                        placeholder="El. paštas" 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <Input 
                        placeholder="Vardas"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    <Input 
                        placeholder="Pavardė"
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                        required
                    />
                    <Input 
                        placeholder="Slaptažodis" 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    {error && <ErrorStyled>{error}</ErrorStyled>}
                <Button>Registruotis</Button>
            <LinkStyled to="/login">Jau turite paskyrą? Prisijunkite</LinkStyled>
            </FormStyled>
        </RegisterContainer>
       
    )
}