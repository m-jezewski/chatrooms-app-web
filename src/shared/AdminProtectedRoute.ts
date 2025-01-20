import {LoggedUser} from "../interfaces.ts";
import { useNavigate } from "react-router";

type UserProtectedRouteProps = {
    user: LoggedUser | null;
    redirectPath?: string;
    children: React.ReactNode;
};

export const AdminProtectedRoute = (
    {
        user,
        redirectPath = "/",
        children,
    }: UserProtectedRouteProps
) => {
    const navigate = useNavigate();

    if (!user) { // todo: is admin check
        navigate(redirectPath)
    }

    return children;
};
