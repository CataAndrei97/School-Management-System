export async function login(email, password) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        throw new Error("Login failed");
    }

    return await res.json();
}

export async function register(email, username, password) {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
    });
    if (!res.ok) {
        throw new Error("Register failed");
    }

    return await res.json();
}

export async function verifyToken(token) {
    const res = await fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
        throw new Error("Token invalid or expired");
    }

    return await res.json();
}

export async function refreshToken(token) {
    const res = await fetch("/api/auth/refresh", {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
        throw new Error("Refresh failed");
    }

    return await res.json();
}
