import express from "express";
import authRoutes from "./auth-routes";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.use("/auth", authRoutes);

// Protect API routes
router.use("/tasks", authenticateToken, (_, res) => {
    res.json({ message: "Authenticated route" });
});


export default router;
