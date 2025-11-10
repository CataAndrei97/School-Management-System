import {useAuth} from "./context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const { user, token } = useAuth();
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export function PublicRoute({ children }) {
    const { user, token } = useAuth();
    if (user && token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
