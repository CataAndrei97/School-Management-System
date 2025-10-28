import { createContext, useContext, useState, useEffect, useRef } from "react";
import { verifyToken, refreshToken } from "../api/auth";
import { Fade } from "@mui/material";
import AuthLoader from "../components/AuthLoader.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const inactivityTimer = useRef(null);
    const justLoggedIn = useRef(false);

    useEffect(() => {
        const checkToken = async () => {
            if (justLoggedIn.current) {
                justLoggedIn.current = false;
                setLoading(false);
                return;
            }

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { user } = await verifyToken(token);
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
            } catch (err) {
                console.warn("Invalid token, logging out...");
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    useEffect(() => {
        if (!token) {
            return;
        }

        const refreshInterval = setInterval(async () => {
            try {
                const { token: newToken } = await refreshToken(token);
                setToken(newToken);
                localStorage.setItem("token", newToken);
                console.log("Token refreshed automatically");
            } catch (err) {
                console.error("Token refresh failed:", err);
                logout();
            }
        }, 50 * 60 * 1000);

        return () => clearInterval(refreshInterval);
    }, [token]);

    useEffect(() => {
        const MAX_IDLE_TIME = 15 * 60 * 1000;

        const resetTimer = () => {
            if (inactivityTimer.current) {
                clearTimeout(inactivityTimer.current);
            }

            if (!token) {
                return;
            }

            inactivityTimer.current = setTimeout(() => {
                console.warn("User inactive too long — logging out...");
                logout();
            }, MAX_IDLE_TIME);
        };

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        resetTimer();

        return () => {
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            if (inactivityTimer.current) {
                clearTimeout(inactivityTimer.current);
            }
        };
    }, [token]);

    const login = (data) => {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        justLoggedIn.current = true;
        setLoading(false);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {loading ? (
                <Fade in={loading} timeout={300}>
                    <div>
                        <AuthLoader />
                    </div>
                </Fade>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
