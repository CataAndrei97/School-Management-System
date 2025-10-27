import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "demo_secret";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: "No token provided"});
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};
