import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";
dotenv.config();
const forceDatabaseRefresh = false;
const app = express();
const PORT = process.env.PORT || 3001;
// ✅ Fix: Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ✅ Enable CORS (Allows frontend to communicate with backend)
app.use(cors());
// ✅ Parse JSON in requests
app.use(express.json());
// ✅ Serve static files from React build (frontend)
app.use(express.static(path.join(__dirname, "../../client/dist")));
// ✅ Prefix all API routes with `/api`
app.use("/api", routes);
// ✅ Sync Sequelize & Start Server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
});
