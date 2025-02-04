import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../db";


dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.user.findUnique({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});


export default router;
