import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "demo_secret";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
