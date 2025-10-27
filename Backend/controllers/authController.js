import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "demo_secret"; // for demo

export const register = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, username, password: hashed, role: role || "student" };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token, user: { username: user.username, role: user.role } });
};
