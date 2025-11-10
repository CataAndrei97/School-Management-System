import {useAuth} from "./context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const { user, token } = useAuth();

    return token && user ? children : <Navigate to="/login" replace />;
}

export function PublicRoute({ children }) {
    const { token } = useAuth();

    return token ? <Navigate to="/dashboard" replace /> : children;
}
