import { useState } from "react";

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
        <form onSubmit={handleLogin}>
            <input 
                placeholder="El. paštas"
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email} 
            />
            <input 
                placeholder="Slaptažodis" 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button>Prisijungti</button>
        </form>
    );
}