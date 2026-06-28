import { Request, Response } from "express";
import {
  fetchQuotes,
  addQuote,
  fetchQuoteById,
  changeQuoteStatus,
  saveAnalysis,
} from "../services/quote.service";

import { analyzeQuote } from "../services/fastapi.service";

export const getQuotes = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;

    const quotes = await fetchQuotes(search);

    res.status(200).json(quotes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch quotes",
    });
  }
};

export const createNewQuote = async (req: Request, res: Response) => {
  try {
    const { customer, project, estimated_value } = req.body;

    if (!customer) {
      return res.status(400).json({
        message: "Customer is required",
      });
    }

    if (!project) {
      return res.status(400).json({
        message: "Project is required",
      });
    }

    if (
      estimated_value === undefined ||
      estimated_value === null ||
      estimated_value < 0
    ) {
      return res.status(400).json({
        message: "Estimated value must be a positive number",
      });
    }

    const quote = await addQuote(
      customer,
      project,
      estimated_value
    );

    res.status(201).json(quote);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create quote",
    });
  }
};

export const getQuote = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const quote = await fetchQuoteById(id);

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    res.status(200).json(quote);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch quote",
    });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const allowedStatus = [
      "New",
      "In Review",
      "Needs Info",
      "Completed",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Allowed values are: New, In Review, Needs Info, Completed",
      });
    }

    const quote = await fetchQuoteById(id);

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    const updatedQuote = await changeQuoteStatus(id, status);

    res.status(200).json(updatedQuote);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update quote status",
    });
  }
};

export const analyzeQuoteRequest = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const quote = await fetchQuoteById(id);

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    const analysis = await analyzeQuote(id);

    const savedAnalysis = await saveAnalysis(
      id,
      analysis.risk,
      analysis.confidence,
      analysis.missing_items.join(", ")
    );

    res.status(200).json({
      quote,
      analysis: savedAnalysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to analyze quote",
    });
  }
};