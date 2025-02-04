import express from "express";
import authRoutes from "./auth-routes.js"; // Add `.js` for ES Modules
import { authenticateToken } from "../middleware/auth.js"; // Add `.js`
const router = express.Router();
router.use("/auth", authRoutes);
// Protect API routes
router.use("/tasks", authenticateToken, (_, res) => {
    res.json({ message: "Authenticated route" });
});
export default router;
