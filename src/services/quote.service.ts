import {
  getAllQuotes,
  createQuote,
  getQuoteById,
  updateQuoteStatus,
  createAnalysis,
} from "../repositories/quote.repository";

export const fetchQuotes = async (search?: string) => {
  return await getAllQuotes(search);
};

export const addQuote = async (
  customer: string,
  project: string,
  estimated_value: number
) => {
  return await createQuote(customer, project, estimated_value);
};

export const fetchQuoteById = async (id: number) => {
  return await getQuoteById(id);
};

export const changeQuoteStatus = async (
  id: number,
  status: string
) => {
  return await updateQuoteStatus(id, status);
};

export const saveAnalysis = async (
  quoteId: number,
  risk: string,
  confidence: number,
  missingItems: string
) => {
  return await createAnalysis(
    quoteId,
    risk,
    confidence,
    missingItems
  );
};