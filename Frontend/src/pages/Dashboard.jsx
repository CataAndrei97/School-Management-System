import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold">Welcome, {user?.username}!</h1>
            <p className="mb-4">Role: {user?.role}</p>
            <button className="bg-red-500 text-white rounded p-2" onClick={logout}>
                Logout
            </button>
        </div>
    );
}
