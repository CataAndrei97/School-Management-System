import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, you are authorized!` });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
