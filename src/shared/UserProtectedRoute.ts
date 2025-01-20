import {LoggedUser} from "../interfaces.ts";
import { useNavigate } from "react-router";

type UserProtectedRouteProps = {
    user: LoggedUser | null;
    redirectPath?: string;
    children: React.ReactNode;
};

export const UserProtectedRoute = (
    {
        user,
        redirectPath = "/",
        children,
    }: UserProtectedRouteProps
) => {
    const navigate = useNavigate();

    if (!user) {
        navigate(redirectPath)
    }

    return children;
};
