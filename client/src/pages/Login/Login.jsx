import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { FormStyled, LoginContainer, LinkStyled, LoginTitle } from "./LoginStyle";

export const Login = ({onSuccess}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email, 
                password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    return (
        <>
        <LoginTitle>Renginio dalyvių registracijos puslapis</LoginTitle>
            <LoginContainer>
                <FormStyled onSubmit={handleLogin}>
                    <h3>Prisijunkite</h3>
                        <Input 
                            placeholder="El. paštas"
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} 
                        />
                        <Input 
                            placeholder="Slaptažodis" 
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <Button>Prisijungti</Button>
                    <LinkStyled to="/register">Registracijos forma</LinkStyled>
                </FormStyled>
            </LoginContainer>
        </>
    );
}