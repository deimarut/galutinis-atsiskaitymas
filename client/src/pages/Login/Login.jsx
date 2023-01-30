import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { FormStyled, LoginContainer, LinkStyled, LoginTitle, FieldsetStyled } from "./LoginStyle";

export const Login = ({onSuccess}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
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
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }

            throw new Error('test error');
        })
        .then((data) => {
            onSuccess(data);
            setIsLoading(false);
        })
        .catch((e) => {
            setError(String(e));
            setIsLoading(false);
        })
    }

    return (
        <>
        <LoginTitle>Renginio dalyvių registracijos puslapis</LoginTitle>
            <LoginContainer>
                <FormStyled onSubmit={handleLogin}>
                    <h2>Prisijunkite</h2>
                        <FieldsetStyled disabled={isLoading}>
                            <Input 
                                placeholder="El. paštas"
                                type="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} 
                                disabled={isLoading}
                            />
                            <Input 
                                placeholder="Slaptažodis" 
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                disabled={isLoading}
                            />
                            {error && <div>{error}</div>}
                            <Button disabled={isLoading}>Prisijungti</Button>
                        </FieldsetStyled>
                    <LinkStyled to="/register">Registracijos forma</LinkStyled>
                </FormStyled>
            </LoginContainer>
        </>
    );
}