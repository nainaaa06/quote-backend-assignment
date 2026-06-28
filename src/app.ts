import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quoteRoutes from "./routes/quote.routes";
import { logger } from "./middleware/logger.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Quote Backend API is running!");
});

app.use("/quotes", quoteRoutes);

export default app;