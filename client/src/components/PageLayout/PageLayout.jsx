import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContextWrapper";
import { Button } from '../Button/Button';
import { Header } from "./PageLayoutStyle";
import {LOCAL_STORAGE_JWT_TOKEN_KEY} from '../../constants/constants';

export const PageLayout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" />
    }

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
        setUser(null);
        navigate('/login');
    }

    return (
        <div>
            <Header>
                <h1>Renginio dalyvių registravimo puslapis</h1>
                <Button onClick={handleLogout}>Atsijungti</Button>
            </Header>
            <Outlet />
        </div>
    )
 };
