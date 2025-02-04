const forceDatabaseRefresh = false;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS (Required for frontend-backend communication)
app.use(cors());

// Allow JSON request parsing
app.use(express.json());

// ✅ Correctly serve frontend static files
import path from "path";
app.use(express.static(path.join(__dirname, "../../client/dist")));

// ✅ Fix: Ensure all API routes use `/api`
app.use("/api", routes);

// ✅ Sync Sequelize and Start Server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
