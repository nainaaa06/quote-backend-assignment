import { Router } from "express";
import {
  getQuotes,
  createNewQuote,
  getQuote,
  updateStatus,
  analyzeQuoteRequest,
} from "../controllers/quote.controller";

const router = Router();

router.get("/", getQuotes);

router.get("/:id", getQuote);

router.post("/", createNewQuote);

router.patch("/:id/status", updateStatus);

router.post("/:id/analyze", analyzeQuoteRequest);

export default router;