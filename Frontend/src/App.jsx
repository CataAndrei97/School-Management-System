import { useState, useEffect } from "react";

function App() {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        fetch("http://localhost:4000")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch(() => setMessage("⚠️ Backend not reachable"));
    }, []);

    return (
        <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
            <h1>🎓 School Management Frontend</h1>
            <h2>{message}</h2>
            <p>Edit <code>src/App.jsx</code> and save — the browser should auto-refresh 🔁</p>
        </div>
    );
}

export default App;
