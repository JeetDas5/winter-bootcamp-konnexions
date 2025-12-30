import express from "express";
import cors from "cors";
import { DB_URL, PORT } from "./config/init.config.js";
import connectDB from "./config/db.config.js";
import apiRoutes from './routes/api.route.js'

const app = express();

app.use(express.json());
app.use(cors());

connectDB(DB_URL)
app.use(apiRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});