import { PropsWithChildren } from "react"; 
import { Navigate } from "react-router";
import useSessionStore from "../store/authStore";

const AuthenticationRoute = ({ children }: PropsWithChildren) => {
    const isLoggedIn = useSessionStore((state) => state.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }
    return <>{children}</>;
};

export { AuthenticationRoute };