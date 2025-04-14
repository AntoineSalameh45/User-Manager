import { PropsWithChildren } from "react"; 
import { Navigate } from "react-router";
import useSessionStore from "../store/authStore";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const isLoggedIn = useSessionStore((state) => state.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};

export { ProtectedRoute };