import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { FormStyled, LoginContainer, LinkStyled, LoginTitle, FieldsetStyled, ErrorStyled } from "./LoginStyle";

export const Login = ({onSuccess}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault(e);
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
            if (res.status === 401) {
                throw new Error('Neteisingi prisijungimo duomenys');
            }

            if (!res.ok) {
                throw new Error('Kažkas negerai');
            }

            return res.json();
        })
        .then((data) => {
            onSuccess(data);
            setIsLoading(false);
            setError('');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    }

    return (
        <>
        <LoginTitle>Renginio dalyvių registracijos puslapis</LoginTitle>
            <LoginContainer>
                <FormStyled onSubmit={handleLogin}>
                    <h2>Prisijunkite</h2>
                        <FieldsetStyled disabled={isLoading} column>
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
                            {error && <ErrorStyled>{error}</ErrorStyled>}
                            <Button>Prisijungti</Button>
                        </FieldsetStyled>
                    <LinkStyled to="/register">Registracijos forma</LinkStyled>
                </FormStyled>
            </LoginContainer>
        </>
    );
}