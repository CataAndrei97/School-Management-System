import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "demo_secret"; // for demo

export const register = async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ message: "Email, Username and Password required" });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, email, username, password: hashed, role: "student" };
    users.push(newUser);

    const token = jwt.sign(
        { id: newUser.id, email: newUser.email, username: newUser.username, role: newUser.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token, user: { email: newUser.email, username: newUser.username, role: newUser.role } });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token, user: { email: user.email, username: user.username, role: user.role } });
};

export const verify = (req, res) => {
    res.json({ user: req.user });
};

export const refreshToken = (req, res) => {
    const { id, email, username, role } = req.user;

    const newToken = jwt.sign(
        { id, email, username, role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token: newToken });
};
