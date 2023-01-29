import { Navigate, Outlet } from "react-router";

export const PageLayout = ({ user }) => {
    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
 };
